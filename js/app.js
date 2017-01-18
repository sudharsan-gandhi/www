// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','app.controller','ngResource','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
.config(function($urlRouterProvider,$stateProvider,$sceDelegateProvider){
    $sceDelegateProvider.resourceUrlWhitelist(['self','**']);

    $stateProvider.
      state('user',{
        url:'/',
        templateUrl:'templates/user.html',
        controller:'userController'
      })
      .state('create',{
        url:'/create',
        templateUrl:'templates/create.html',
        controller:'createController'
      })
      .state('initiate',{
        url:'/initiate',
        templateUrl:'templates/initiate.html',
        controller:'initiateController'
      })
      .state('status',{
        url:'/status',
        templateUrl:'templates/status.html',
        controller:'statusController'
      })
      .state('aftermath',{
        url:'/aftermath',
        templateUrl:'templates/aftermath.html',
        controller:'aftermathController'
      })

      $urlRouterProvider.otherwise('/');
})
