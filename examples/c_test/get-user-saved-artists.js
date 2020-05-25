var SpotifyWebApi = require('../../src/server.js');
var {client_id, client_secret} = require('../../../secure/app_variables');

var spotifyApi = new SpotifyWebApi({
    clientId: client_id,
    clientSecret: client_secret,
    redirectUri: 'http://localhost:8888/'
});

const authorizationCode = 'AQCWbJTI00hBJ_PHLgxCVg-bJhc9UA-LDzWEyS5kvhHhLpa-mvz1x_Mb2-Oi_lZYJqaPUFQqAlniLDBiR9cLvAhe7UMVgS0sZ03bqahCjMBUSJ1U2M_St3h_IkF9Z3N_N7NFzZxn5N7MMnNFNuHrVxuprXe0KvbjebKc63m7roY4qOplTco6yvQDUCvGdHgUayf0MiBfIKA6lomwcan8tqIRtWewFQ6JDr_bKzWmpxk';



// retrieve an access token
spotifyApi
    .authorizationCodeGrant(authorizationCode)
    .then(function(data) {
        console.log('The access token expires in ' + data['expires_in']);
        console.log('The access token is ' + data['access_token']);

        // Save the access token so that it's used in future calls
        spotifyApi.setAccessToken(data['access_token']);

        // Get the most popular tracks by David Bowie in Great Britain
        return spotifyApi.getMe();
    },
    function(err) {
        console.log(
            'Something went wrong when retrieving an access token',
            err.message
        );
    })

    .then(data => {
        // console.log(data.body);     
    })

    .catch(error => console.log(error));
