angular.module('livePlaylists')

.controller('AccountCtrl', function($scope, loginService, Spotify, $ionicPlatform) {
    //This function will run when the app loads
    $ionicPlatform.ready(function() {
        var storedToken = window.localStorage.getItem('spotify-token');
        if (storedToken !== null) {
            //if the user has logged in before, get new auth token
            Spotify.setAuthToken(storedToken);
            loginService.updateInfo();
        } else {
            //if user hasn't logged in ever, log them in
            loginService.connectToSpotify();
        }
    });


    //loginService.connectToSpotify();
    //loginService.testConnect();

    $scope.settings = {
        enableFriends: true
    };

    $scope.getSpotifyAuthTest = function(){
        $scope.spotifyAuthToken = loginService.getSpotifyAuthToken();
    };


    var getUserPlaylists = function(userid) {
        console.log("currently");
        console.log($scope.spotifyPlaylists);
        if($scope.spotifyPlaylists == undefined){
            Spotify.getUserPlaylists(userid).then(function (data) {
                console.log("got playlists");
                console.log(data);
                $scope.spotifyPlaylists = data.data.items;
            });
        }
    };


    $scope.getSpotifyPlaylists = function(){
        Spotify.getCurrentUser().then(function (data) {
            console.log(data);
            getUserPlaylists(data.id);
        }, function(error) {
            //Retry connecting to spotify
            loginService.connectToSpotify();
        });
    }






});