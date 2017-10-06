angular.module('livePlaylists.controllers', [])

.controller('AccountCtrl', function($scope, loginService) {
    //loginService.connectToSpotify();
    loginService.testConnect();

    $scope.settings = {
        enableFriends: true
    };
});