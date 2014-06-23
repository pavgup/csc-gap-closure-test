'use strict';

/**
 * @ngdoc overview
 * @name gapCloseApp
 * @description
 * # gapCloseApp
 *
 * Main module of the application.
 */
angular
  .module('gapCloseApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/FYChallenge', {
        templateUrl: 'views/fychallenge.html',
        controller: 'FYChallengeCtrl'
      })
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .service('sharedProperties', function() {
    var projNum = '';
    var orgCode = '';
    var projMeta;
    return {
      getProjNum: function() {
        return projNum;
      },
      getOrgCode: function() {
        return orgCode;
      },
      getProjMeta: function() {
        return projMeta;
      },
      setProjNum: function(value) {
        projNum = value;
      },
      setOrgCode: function(value) {
        orgCode =  value;
      },
      setProjMeta: function(value) {
        projMeta = value;
      }
    };
  });
