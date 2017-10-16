angular.module('livePlaylists')
    .controller('PlaylistCtrl', function($scope, $stateParams, Spotify, loginService, client_ID) {
        var listid = $stateParams.listid;
        var userid = $stateParams.userid;
        $scope.listname = $stateParams.listname;
        $scope.spotifyAuthToken = loginService.getSpotifyAuthToken();

        $scope.audio = new Audio();

        $scope.tracks = [];

        Spotify.getPlaylist(userid, listid).then(function (data) {
            console.log(data);
            $scope.tracks = data.data.tracks.items;
        });

        $scope.playTrack = function(trackInfo) {
            var events = cordova.plugins.spotify.getEventEmitter();
            cordova.plugins.spotify.play(trackInfo.track.uri, {
                token:$scope.spotifyAuthToken,
                "clientId":client_ID
            });
            console.log(events);
            events.then(function(data){
                console.log("event done");
                console.log(data);
            });
            // events.listeners('connectionmessage', true);


            // $scope.audio.src = trackInfo.track.preview_url;
            // $scope.audio.play();
        };

        $scope.openSpotify = function(link) {
            window.open(link, '_blank', 'location=yes');
        };

        $scope.stop = function() {
            if ($scope.audio.src) {
                $scope.audio.pause();
            }
        };

        $scope.play = function() {
            if ($scope.audio.src) {
                $scope.audio.play();
            }
        };

    });