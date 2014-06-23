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

function TypeaheadCtrl ($scope, $http) {
  // Any function returning a promise object can be used to load values asynchronously
  $scope.getOrgCode = function(val) {
    return $http.get('http://ec2-54-83-169-13.compute-1.amazonaws.com:5000/v1.0/project_metadata/org_code/'+val)
    .then(function(res){
      var select = [];
      angular.forEach(res.data.results, function(item){
        select.push(item[15]);
      });
      //var checkComplete = $http.get('http://ec2-54-83-169-13.compute-1.amazonaws.com:5000/v1.0/project_metadata?pn='+$scope.projectNumber+'&org='+$scope.orgCode)
      //if(checkComplete.data.results.length === 1) {
      //  $scope.successVar = "btn btn-lg btn-good";
      //}
      return select;
    });
  };
  $scope.getProjectNumber = function(val) {
    return $http.get('http://ec2-54-83-169-13.compute-1.amazonaws.com:5000/v1.0/project_metadata/project_number/'+val)
    .then(function(res){
      var select = [];
//      if(res.data.results.length === 1) {
//      if($http.get('http://ec2-54-83-169-13.compute-1.amazonaws.com:5000/v1.0/project_metadata/project_number_all/'+val).data.results.length === 1) {
//          $scope.orgCode = 'a';
//        }
//      }
      angular.forEach(res.data.results, function(item){
        select.push(item[1]);
      });
      return select;
    });
  };
}
