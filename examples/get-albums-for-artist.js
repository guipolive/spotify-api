var SpotifyWebApi = require('../src/server');
var {client_id, client_secret} = require('../../secure/app_variables');

/**
 * This example retrives an access token using the Client Credentials Flow. It's well documented here:
 * https://developer.spotify.com/web-api/authorization-guide/#client_credentials_flow
 */

/*
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */

/**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */

var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret
});

const artistID = '0oSGxfWSnnOXhD2fKuz2Gy';

// Retrieve an access token
spotifyApi
.clientCredentialsGrant()
.then(
  function(data) {
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get the most popular tracks by David Bowie in Great Britain
    return spotifyApi.getArtistAlbums(artistID);
  },
  function(err) {
    console.log(
      'Something went wrong when retrieving an access token',
      err.message
    );
  }
)
.then(function(data) {
    console.log('The albums of artist 0oSGxfWSnnOXhD2fKuz2Gy are: ');
    data.body.items.forEach((album, index) => {
        console.log(index + 1 + '. ' + album.name + ': ' + album.external_urls.spotify);
    })
}

)