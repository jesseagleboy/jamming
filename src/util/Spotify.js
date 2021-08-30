let userAccessToken;

const getAccessToken = () => {
    if (userAccessToken) {
        return userAccessToken;
    }

    const accessToken = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/); 
}

const Spotify = {
    getAccessToken: getAccessToken,
};

export default Spotify;