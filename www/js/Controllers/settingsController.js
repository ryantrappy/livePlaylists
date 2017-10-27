angular.module('livePlaylists')
    .controller('SettingsCtrl', function($scope, Spotify, loginService, client_ID, itunesURL, accountService) {

        $scope.loginKeys = {
            "spotify":undefined,
            "appleMusic":undefined,
            "soundCloud":undefined
        };

        $scope.loginKeys.spotify = loginService.getSpotifyAuthToken();

        $scope.spotifyLogin = function(){

        };

        $scope.appleMusicLogin = function(){

            //After this move to someplace else
            appleMusicPlugin.requestAuthorization(
                function(isAuthorized){
                    console.log("authorized");
                    trackId = "https://itunes.apple.com/us/artist/jack-johnson/id909253?uo=4";
                    appleMusicPlugin.playTrack(trackId,
                        function(data){console.log("playing")},
                        function(data){console.log(data)})
                    //https://itunes.apple.com/us/artist/jack-johnson/id909253?uo=4
                }, function(data){
                    console.log(data);
                    console.log("failed to authorize");
                })
        };

        // $scope.searchResults = accountService.appleSearch("selena gomez");

        $scope.soundCloudLogin = function(){

        };
    });