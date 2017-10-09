angular.module('livePlaylists.controllers', [])

.controller('AccountCtrl', function($scope, loginService, Spotify, $ionicPlatform) {
    //This function will run when the app loads
    $ionicPlatform.ready(function() {
        var storedToken = window.localStorage.getItem('spotify-token');
        if (storedToken !== null) {
            //if the user has logged in before, get new auth token
            Spotify.setAuthToken(storedToken);
            $scope.updateInfo();
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


});