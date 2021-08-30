let userAccessToken;
const clientID = ''

const getAccessToken = () => {
    if (userAccessToken) {
        return userAccessToken;
    }

    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessToken && expiresInMatch) {
        userAccessToken = accessToken[1];
        const expirationTime = Number(expiresInMatch[1]);

        window.setTimeout(() => userAccessToken = '', expirationTime * 1000);
        window.history.pushState('Access Token', null, '/');

        return accessToken;
    }
}

const Spotify = {
    getAccessToken: getAccessToken,
};

export default Spotify;