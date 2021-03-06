var SpotifyWebApi = require('../src/server');
var {client_id, client_secret} = require('../../secure/app_variables');

/**
 * This example retrieves the top tracks for an artist.
 * https://developer.spotify.com/spotify-web-api/get-artists-top-tracks/
 */

/**
 * This endpoint doesn't require an access token, but it's beneficial to use one as it
 * gives the application a higher rate limit.
 *
 * Since it's not necessary to get an access token connected to a specific user, this example
 * uses the Client Credentials flow. This flow uses only the client ID and the client secret.
 * https://developer.spotify.com/spotify-web-api/authorization-guide/#client_credentials_flow
 */
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret
});

// Retrieve an access token
spotifyApi
  .clientCredentialsGrant()
  .then(function(data) {
    // Set the access token on the API object so that it's used in all future requests
    spotifyApi.setAccessToken(data.body['access_token']);

    // Get the most popular tracks by David Bowie in Great Britain
    return spotifyApi.getArtistTopTracks('0oSGxfWSnnOXhD2fKuz2Gy', 'GB');
  })
  .then(function(data) {
    console.log('The most popular tracks for David Bowie is..');
    console.log('Drum roll..');
    console.log('...');

    /*
     * 1. Space Oddity - 2009 Digital Remaster (popularity is 51)
     * 2. Heroes - 1999 Digital Remaster (popularity is 33)
     * 3. Let's Dance - 1999 Digital Remaster (popularity is 20)
     * 4. ...
    */
    data.body.tracks.forEach(function(track, index) {
      console.log(
        index +
          1 +
          '. ' +
          track.name +
          ' (popularity is ' +
          track.popularity +
          ')' +
          track
      );
    });
  })
  .catch(function(err) {
    console.log('Unfortunately, something has gone wrong.', err.message);
  });