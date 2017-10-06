angular.module('livePlaylists.services', [])
.service("loginService", function($http, spotifyURL) {

    /******************************/
    /* This function connects to spotify for our application*/
    var connectToSpotify = function() {
        var redirectLoc = encodeURI("http://ionic.local/#/tab/account");
        $http({
            method: "GET",
            url: spotifyURL + '/authorize?client_id=1f9d58e4c14e488ba401b7c34712822a&response_type=code&redirect_uri=' + redirectLoc,
        }).then(function successCallback(data) {
                console.log("success");
                console.log(data);
                // successCB(data);
            },
            function errorCallBack(data) {
                console.log("failed");
                console.log(data);
                // failCB(data);
            });
    };
    var testConnect = function(){
    //    https://accounts.spotify.com/authorize?client_id=1f9d58e4c14e488ba401b7c34712822a&response_type=token&redirect_uri =www.google.com
        var redirectLoc = encodeURI("https://www.google.com");
        $http({
            method: "GET",
            url: "https://accounts.spotify.com/authorize?client_id=1f9d58e4c14e488ba401b7c34712822a&response_type=token&redirect_uri=" + redirectLoc,
            headers:{
                "Access-Control-Allow-Origin":"http://*",
                "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"
            }
        }).then(function successCallback(data) {
                console.log("success");
                console.log(data);
                // successCB(data);
            },
            function errorCallBack(data) {
                console.log("failed");
                console.log(data);
                // failCB(data);
            });
    }


    //All functions go here to allow them outside access from the service
    return {
        connectToSpotify:function(){
            return connectToSpotify()
        },
        testConnect:function(){
            return testConnect();
        }
    };
});