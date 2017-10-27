angular.module('livePlaylists')

.controller('AccountCtrl', function($scope, loginService, Spotify, $ionicPlatform, $state, accountService) {
    //This function will run when the app loads
    $ionicPlatform.ready(function() {
        var storedToken = window.localStorage.getItem('spotify-token');
        if (storedToken !== null) {
            //if the user has logged in before, get new auth token
            Spotify.setAuthToken(storedToken);
            loginService.updateInfo($scope.getSpotifyPlaylists);
        } else {
            //if user hasn't logged in ever, log them in
            loginService.connectToSpotify($scope.getSpotifyPlaylists);
        }
    });


    //loginService.connectToSpotify();
    //loginService.testConnect();
    $scope.searchResults = {
        "appleMusic":[],
        "spotify":[],
        "soundCloud":[]
    }

    var searchItunes = function(searchString){
        var successCallback = function(data){
                console.log("success getting itunes stuffs");
                console.log(data);
                // successCB(data);
                $scope.searchResults.appleMusic = data.data.results;
                console.log($scope.searchResults.appleMusic);
        };
        accountService.appleSearch(searchString,successCallback);
    };

    $scope.search = function(searchString){
        //Where all the searches are sent out
        searchItunes(searchString)
    };


    var playAppleMusic = function(songObject){
        appleMusicPlugin.playTrack(songObject.trackViewUrl,
            function(data){console.log("playing from playAppleMusic")},
            function(data){console.log(data)})
    };

    $scope.playMusic = function(songObject){
        playAppleMusic(songObject)
    };

    $scope.getSpotifyAuthTest = function(){
        $scope.spotifyAuthToken = loginService.getSpotifyAuthToken();
    };

    $scope.goToPlaylist = function(listid, userid, listname){
        // $state.is();
        console.log("listid " + listid + " userid " + userid + " listname " + listname);
        $state.go("tab.playlist", {"listid": listid, "userid": userid, "listname": listname})
    };


    var getUserPlaylists = function(userid) {
        console.log("currently");
        console.log($scope.spotifyPlaylists);
        if($scope.spotifyPlaylists == undefined){
            var options = {
                "limit":50,
                "offset":0
            };
            Spotify.getUserPlaylists(userid, options).then(function (data) {
                console.log("got playlists");
                console.log(data);
                $scope.spotifyPlaylists = data.data.items;
            });
        }
    };


    $scope.getSpotifyPlaylists = function(){
        Spotify.getCurrentUser().then(function (data) {
            console.log(data);
            getUserPlaylists(data.data.id);
        }, function(error) {
            //Retry connecting to spotify
            loginService.connectToSpotify();
        });
    }







});