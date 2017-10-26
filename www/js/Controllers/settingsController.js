angular.module('livePlaylists')
    .controller('SettingsCtrl', function($scope, Spotify, loginService, client_ID) {

        $scope.loginKeys = {
            "spotify":undefined,
            "appleMusic":undefined,
            "soundCloud":undefined
        };

        $scope.loginKeys.spotify = loginService.getSpotifyAuthToken();

        $scope.spotifyLogin = function(){

        };

        $scope.appleMusicLogin = function(){

        };

        $scope.soundCloudLogin = function(){

        };
    });