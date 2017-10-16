angular.module('livePlaylists')
    .controller('PlaylistCtrl', function($scope, $stateParams, Spotify, loginService, client_ID) {
        var listid = $stateParams.listid;
        var userid = $stateParams.userid;
        $scope.listname = $stateParams.listname;
        $scope.spotifyAuthToken = loginService.getSpotifyAuthToken();
        $scope.spotifySession = cordova.plugins.spotify;

        $scope.audio = new Audio();

        $scope.tracks = [];

        Spotify.getPlaylist(userid, listid).then(function (data) {
            console.log(data);
            $scope.tracks = data.data.tracks.items;
        });

        $scope.playTrack = function(trackInfo) {
            var events = $scope.spotifySession.getEventEmitter();

            $scope.spotifySession.getEventEmitter().then( function(data){
                console.log("got event emitter");
                console.log(data);
            });
            console.log($scope.spotifyAuthToken);

            $scope.spotifySession.play(trackInfo.track.uri, {
                token:$scope.spotifyAuthToken,
                "clientId":client_ID
            }).then(
                function(data){console.log(data)},
                function(data){console.log(data)}
                );

            console.log(events);
            events.then(function(data){
                console.log("event done");
                console.log(data);
            });
            $scope.spotifySession.resume().then(function(data){
                console.log("resuming");
                console.log(data);
                console.log(events)
            },
            function(data){
                console.log("failed??");
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