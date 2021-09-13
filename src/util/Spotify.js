import clientInfo from "./clientInfo.js";
let userAccessToken = null;
let accessURL = null;
const clientID = clientInfo.clientID;
const redirectURI = clientInfo.redirectURI;

function getAccessToken(term) {
    if (userAccessToken) {
    return userAccessToken;
  }

  const accessToken = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

  if (accessToken && expiresInMatch) {
    userAccessToken = accessToken[1];
    const expirationTime = Number(expiresInMatch[1]);

    window.setTimeout(() => userAccessToken = " ", expirationTime * 1000);
    window.history.pushState("Access Token", 'Token', `${term}`);

    return userAccessToken;
  } else {
    console.log(clientInfo);
    accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-private&redirect_uri=${redirectURI}`;
    window.location.href = accessURL;
  }
}

async function search(searchTerm) {
  const accessToken = Spotify.getAccessToken(searchTerm);
  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

  window.history.pushState('Search', 'Search', `/q?term=${searchTerm}`);

  if (response.ok) {
    const jsonResponse = await response.json();

    if (jsonResponse.tracks) {
      return jsonResponse.tracks.items.map((track) => {
        return {
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri,
        };
      });
    }
    } else {
        return [];
  }
}

async function savePlaylist(name, URIs) {
  if (!name || !URIs.length) {
    console.log(`${name}: ${URIs}`);
    return;
  }

  console.log(URIs);
  
  console.log(userAccessToken);
  const headers = {Authorization: `Bearer ${userAccessToken}`, 'Content-Type': 'application/json'};
  let userID = '';

  const responseID = await fetch('https://api.spotify.com/v1/me', {headers: headers});

  if (responseID.ok) {
    const jsonResponse = await responseID.json();
    userID = jsonResponse.id;
    const playlistResponse = await fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {headers: headers, method: 'POST', body: JSON.stringify({name: name, public: false})});
    if (playlistResponse.ok) {
      const playlistJson = await playlistResponse.json();
      const playlistID = playlistJson.id;
      const addTracks = await fetch(`https://api.spotify.com/v1/playlists/${playlistID}/tracks`, {headers: headers, method: 'POST', body: JSON.stringify({uris: URIs})});
      if (addTracks.ok) {
        const jsonTracks = await addTracks.json();
        console.log(jsonTracks);
      } else {
        console.log('There seems to be a problem.');
      }
    }
  }

  console.log(`This is userID: ${userID}`);
  
  if (name && URIs) {
    return true;
  } else {
    return false;
  }
}

const Spotify = {
  getAccessToken: getAccessToken,
  search: search,
  authenticate: getAccessToken,
  savePlaylist: savePlaylist,
};

export default Spotify;
