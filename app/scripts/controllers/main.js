'use strict';
/*jshint camelcase: false */
/**
 * @ngdoc function
 * @name gapCloseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the gapCloseApp
 */
angular.module('gapCloseApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });

function TypeaheadCtrl($scope, $http) {
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getLocation = function(val) {
    return $http.get('http://maps.googleapis.com/maps/api/geocode/json', {
      params: {
        address: val,
        sensor: false
      }
    }).then(function(res){
      var addresses = [];
      angular.forEach(res.data.results, function(item){
        addresses.push(item.formatted_address);
      });
      return addresses;
    });
  };

} 
