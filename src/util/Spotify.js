import clientInfo from "./clientInfo";
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
    accessURL = `https://accounts.spotify.com/authorize?client_id=${clientID}&redirect_uri=${redirectURI}&scope=user-read-private%20user-read-email&response_type=token&state=123`;
    window.location.href = accessURL;

  }
}

async function search(searchTerm) {
  const accessToken = Spotify.getAccessToken(searchTerm);
  const response = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=${searchTerm}`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );

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

const Spotify = {
  getAccessToken: getAccessToken,
  search: search,
  authenticate: getAccessToken,
};

export default Spotify;
