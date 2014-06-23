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

function TypeaheadCtrl ($scope, $http, sharedProperties) {
  $scope.successVar = false;

  $scope.getOrgCode = function(val) {
    return $http.get('http://ec2-54-83-169-13.compute-1.amazonaws.com:5000/v1.0/project_metadata?pn='+$scope.projectNumber+'&org='+val)
    .then(function(res){
      if(res.data.results.length === 1) {
        $scope.orgCode = res.data.results[0][15];
        $scope.projectNumber = res.data.results[0][1];
        $scope.projectName = res.data.results[0][2];
        $scope.successVar = true;
        $scope.successButton = 'Continue!';
        sharedProperties.setProjNum($scope.projectNumber);
        sharedProperties.setOrgCode($scope.orgCode);
        sharedProperties.setProjMeta(res.data.results[0]);
        return [];
      } else if(res.data.results.length === 0) {
        $scope.orgCodeAlerts= [{type:'danger',msg:'No organization code like "'+val+'" exists.'}];
        $scope.orgCode = val.slice(0,-1);
        return $scope.getOrgCode($scope.orgCode);
      } else {
        var select = [];
        angular.forEach(res.data.results, function(item){
          select.push(item[15]);
        });
        return select;
      }
    });
  };
  $scope.orgCodeAlerts = [];

  $scope.closeOrgCodeAlert = function(index) {
    $scope.orgCodeAlerts.splice(index, 1);
  };
  
  $scope.getProjectNumber = function(val) {
    return $http.get('http://ec2-54-83-169-13.compute-1.amazonaws.com:5000/v1.0/project_metadata?pn='+val+'&org='+$scope.orgCode)
    .then(function(res){
      if(res.data.results.length === 1) {
        $scope.orgCode = res.data.results[0][15];
        $scope.projectNumber = res.data.results[0][1];
        $scope.projectName = res.data.results[0][2];
        $scope.successVar = true;
        $scope.successButton = 'Continue!';
        sharedProperties.setProjNum($scope.projectNumber);
        sharedProperties.setOrgCode($scope.orgCode);
        sharedProperties.setProjMeta(res.data.results[0]);
        return [];
      } else if(res.data.results.length === 0) {
        $scope.projNumAlerts= [{type:'danger',msg:'No project number like "'+val+'" exists.'}];
        $scope.projectNumber = val.slice(0,-1);
        return $scope.getProjectNumber($scope.projectNumber);
      } else {
        var select = [];
        angular.forEach(res.data.results, function(item){
          select.push(item[1]);
        });
        return select;
      }
    });
  };
  $scope.projNumAlerts = [];

  $scope.closeProjNumAlert = function(index) {
    $scope.projNumAlerts.splice(index, 1);
  };

}
