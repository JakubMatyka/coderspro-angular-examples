'use strict';

var myApp = angular.module('myApp', []);

myApp.controller('myAppCtrl', ['$scope', '$http', function myAppCtrl($scope, $http) {
  $http.get('countries.json').success(function (data) {
      $scope.countries = data;
    });

  $scope.sortField = 'population';
  $scope.reverse = true;
  $scope.sortFields = function (data) {
    $scope.sortField = data;
    $scope.reverse = !$scope.reverse;
  }
}]);