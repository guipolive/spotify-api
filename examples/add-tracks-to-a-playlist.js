var SpotifyWebApi = require('../src/server');
var {client_id, client_secret} = require('../../secure/app_variables');

/**
 * This example demonstrates adding tracks to a specified position in a playlist.
 *
 * Since authorization is required, this example retrieves an access token using the Authorization Code Grant flow,
 * documented here: https://developer.spotify.com/spotify-web-api/authorization-guide/#authorization_code_flow
 *
 * Codes are given for a set of scopes. For this example, the scopes are playlist-modify-public.
 * Scopes are documented here:
 * https://developer.spotify.com/spotify-web-api/using-scopes/
 */

/* This code is hardcoded. For a working implementation, the code needs to be retrieved from the user. See documentation about
 * the Authorization Code flow for more information.
 */
var authorizationCode = 'AQAjRd3Tnd7auQd8ZfAYwCwW2Ma7eJ6thrkmECaNuem8s_yxXCSv8qgsZINc1oi1CZGagfbxIiXR2ci9_J9a7_CwEaVCxsIID9rsC087i9PL5IuIESpFf_ZWBxOAJ5xfdkVFfO3kTVX0aFoZ09ygs2BUtn7dbKnABMstBxkhq_VvfaXKDdze6C1f8WVcQtIufsxMq_TwArTM2lsf0aJfrbGWOIokUatf3dG9t3_k1AA';

/**
 * Set the credentials given on Spotify's My Applications page.
 * https://developer.spotify.com/my-applications
 */
var spotifyApi = new SpotifyWebApi({
  clientId: client_id,
  clientSecret: client_secret,
  redirectUri: 'http://localhost:8888/'
});

// First retrieve an access token
spotifyApi
  .authorizationCodeGrant(authorizationCode)
  .then(function(data) {
    spotifyApi.setAccessToken(data.body['access_token']);
    return spotifyApi.addTracksToPlaylist(
      'thelinmichael',
      '5ieJqeLJjjI8iJWaxeBLuK',
      [
        'spotify:track:4iV5W9uYEdYUVa79Axb7Rh',
        'spotify:track:1301WleyT98MSxVHPZCA6M'
      ],
      {
        position: 10
      }
    );
  })
  .then(function(data) {
    console.log('Added tracks to the playlist!');
  })
  .catch(function(err) {
    console.log('Something went wrong!', err.message);
  });
