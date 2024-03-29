// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('livePlaylists', ['ionic', 'livePlaylists.controllers', 'livePlaylists.services', 'spotify', 'ngCordovaOauth'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
    appleMusicPlugin.init(
        function(data){
            console.log(data);
            console.log("inited"


            )
        },
        function(data){console.log(data);console.log("errored")
        })
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.playlist', {
    url: '/playlist/:listid/:userid/:listname',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-playlist.html',
        controller: 'PlaylistCtrl'
      }
    }
  })

  .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    })
    // .state('tab.chat-detail', {
    //   url: '/chats/:chatId',
    //   views: {
    //     'tab-chats': {
    //       templateUrl: 'templates/chat-detail.html',
    //       controller: 'ChatDetailCtrl'
    //     }
    //   }
    // })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/account');

})
    .value("spotifyURL","https://api.spotify.com/v1")
    .value("client_ID","1f9d58e4c14e488ba401b7c34712822a")
    .value("callback_uri","https://api.spotify.com/v1")
// .config(function (SpotifyProvider) {
//     SpotifyProvider.setClientId("1f9d58e4c14e488ba401b7c34712822a");
//     SpotifyProvider.setRedirectUri(callback_uri);
//     SpotifyProvider.setScope('user-read-private playlist-read-private playlist-modify-private playlist-modify-public');
//     // If you already have an auth token
//     SpotifyProvider.setAuthToken('<AUTH_TOKEN>');
// })

