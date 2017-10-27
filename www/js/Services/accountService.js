/**
 * Created by ryan on 10/26/17.
 */

angular.module('livePlaylists')
.service("accountService", function($http, itunesURL) {
    var appleSearch = function(searchString, successCallback){
        console.log(searchString);
        console.log("searching itunes");
        var sanitizedString = searchString.replace(/ /g, '+');
        $http({
            method: "GET",
            url: itunesURL + "term=" + sanitizedString
        }).then(successCallback,
            function(data) {
                console.log("failed getting itunes stuffs");
                console.log(data);
                // failCB(data);
            });
        };

    //All functions go here to allow them outside access from the service
    return {
        appleSearch:function(searchString, successCallback){
            return appleSearch(searchString, successCallback)
        }
    };
});
