var SpotifyWebApi = require('../../src/server.js');
var {client_id, client_secret} = require('../../../secure/app_variables');

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret
});

const albumID = '4aawyAB9vmqN3uQ7FjRGTy';

// retrieve an access token
spotifyApi
    .clientCredentialsGrant()
    .then(function(data) {
        console.log('The access token expires in ' + data.body['expires_in']);
        console.log('The access token is ' + data.body['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data.body['access_token']);

        // Get the most popular tracks by David Bowie in Great Britain
        return spotifyApi.getAlbumTracks(albumID);
    },
    function(err) {
        console.log(
        'Something went wrong when retrieving an access token',
        err.message
        );
    }
    )
    .then(data => {
        console.log('');
        console.log('');
        console.log(`Tracks for album ${albumID}:`);
        
        //for each track of the album:
        data.body.items.forEach((track, index) => {
            console.log((index+1) + '. ' + track.name);
        })
            
        });