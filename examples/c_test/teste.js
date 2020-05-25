var SpotifyWebApi = require('../../src/server.js');
var {client_id, client_secret} = require('../../../secure/app_variables');

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: 'http://localhost:8888/'
});

// const authorizationCode = 'BQC3M1RERJP9qAzDvFHEf_aLCG0WjaR8EkvBzSzSFMfds-noWk7UVQ4Zujra_cHcMeXjhsMNjn2ZekDx0iqWR24J9k8nEDIRiMbzm9e96zrrZv3GINMqfXZwUuf1F5VgC46hphQYaA';



var scopes = ['user-read-private', 'user-read-email'],
  state = 'some-state-of-my-choice',
  clientId = client_id,
    clientSecret = client_secret,
    redirectUri = 'http://localhost:8888/';

// Setting credentials can be done in the wrapper's constructor, or using the API object's setters.
var spotifyApi = new SpotifyWebApi({
  redirectUri: redirectUri,
  clientId: clientId
});

// Create the authorization URL
var authorizeURL = spotifyApi.createAuthorizeURL(scopes, state);

// https://accounts.spotify.com:443/authorize?client_id=5fe01282e44241328a84e7c5cc169165&response_type=code&redirect_uri=https://example.com/callback&scope=user-read-private%20user-read-email&state=some-state-of-my-choice
console.log(authorizeURL);