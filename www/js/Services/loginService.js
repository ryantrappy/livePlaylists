angular.module('livePlaylists')
.service("loginService", function($http, Spotify, spotifyURL, $cordovaOauth, client_ID) {

    /******************************/
    /* This function connects to spotify for our application*/
    // var connectToSpotify = function() {
    //     var redirectLoc = encodeURI("http://ionic.local/#/tab/account");
    //     $http({
    //         method: "GET",
    //         url: spotifyURL + '/authorize?client_id=1f9d58e4c14e488ba401b7c34712822a&response_type=code&redirect_uri=' + redirectLoc,
    //     }).then(function successCallback(data) {
    //             console.log("success");
    //             console.log(data);
    //             // successCB(data);
    //         },
    //         function errorCallBack(data) {
    //             console.log("failed");
    //             console.log(data);
    //             // failCB(data);
    //         });
    // };
    var spotifyAuthToken = window.localStorage.getItem('spotify-token');
    var userInfo = {"spotifyPlaylists":undefined};

    var getSpotifyAuthToken = function(){
        return spotifyAuthToken;
    };

    /******************************/
    /* This function connects to spotify for our application*/
    var connectToSpotify = function(){
        var options = {
            "redirect_uri": "http://localhost/callback"
        };
        //https://liveplaylists-613c5.firebaseapp.com/callback"
        //https://liveplaylists-613c5.firebaseapp.com/callback#access_token=BQDc3xs1YjzLQd0zXfe0GXxW5UEICB-EjafwnZpl2yQJpDsH1F6CAt0BkVwGkvgaRXvbApZ1TQkHx0DGD4LnAUXiqfXhMlpxouMEA6iPw716bn4pLHn3u7wfCQSVB0SDBnS9GYquzsdWaXSzlJbVm3PlpYaN6wH0zIMEzmGKEgRzMkQ&token_type=Bearer&expires_in=3600
        console.log(window.location);
        $cordovaOauth.spotify(client_ID, ['user-read-private', 'playlist-read-private', 'streaming', 'user-read-currently-playing']).then(function(result){
            window.localStorage.setItem('spotify-token', result.access_token);
            spotifyAuthToken = result.access_token;
            Spotify.setAuthToken(result.access_token);
            return updateInfo();
        },
            function(error){
                console.log(error);
            })
    };

    var updateInfo = function() {
        Spotify.getCurrentUser().then(function (data) {
            console.log(data.data.id);
            getUserPlaylists(data.data.id);
            console.log(data);
            return data;
        }, function(error) {
            //Retry connecting to spotify
            connectToSpotify();
        });
    };


    var getUserPlaylists = function(userid) {
        console.log("The user ID " + userid);
        var options = {
            "limit":50,
            "offset":0
        };
        Spotify.getUserPlaylists(userid, options).then(function (data) {
            console.log("got playlists");
            console.log(data);
            userInfo.spotifyPlaylists = data.data.items;
        });
        console.log(userInfo.spotifyPlaylists);
    };

    var getSpotifyPlaylists = function(){
        return userInfo.spotifyPlaylists;
    }



    // var testConnect = function(){
    // //    https://accounts.spotify.com/authorize?client_id=1f9d58e4c14e488ba401b7c34712822a&response_type=token&redirect_uri =www.google.com
    //     var redirectLoc = encodeURI("https://www.google.com");
    //     $http({
    //         method: "GET",
    //         url: "https://accounts.spotify.com/authorize?client_id=1f9d58e4c14e488ba401b7c34712822a&response_type=token&redirect_uri=" + redirectLoc,
    //         headers:{
    //             "Access-Control-Allow-Origin":"http://*",
    //             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
    //         }
    //     }).then(function successCallback(data) {
    //             console.log("success");
    //             console.log(data);
    //             // successCB(data);
    //         },
    //         function errorCallBack(data) {
    //             console.log("failed");
    //             console.log(data);
    //             // failCB(data);
    //         });
    // };


    //All functions go here to allow them outside access from the service
    return {
        connectToSpotify:function(){
            return connectToSpotify()
        },
        updateInfo:function(){
            return updateInfo();
        },
        getSpotifyAuthToken:function(){
            return getSpotifyAuthToken();
        },
        getSpotifyPlaylists:function () {
            return getSpotifyPlaylists()
        }
    };
});