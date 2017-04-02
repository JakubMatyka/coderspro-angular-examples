'use strict';

var countryApp = angular.module('countryApp', [
  'ngRoute'
]);

countryApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'country-list.html',
      controller: 'CountryListCtrl'
    })
    .when('/:countryName', {
      templateUrl: 'country-detail.html',
      controller: 'CountryDetailCtrl'
    })
    .otherwise({
      redirect: '/'
    })
}]);

countryApp.controller('CountryListCtrl', ['$scope', '$http', function($scope, $http) {
  $http.get('countries.json').success(function (data) {
      $scope.countries = data;
    });
}]);

countryApp.controller('CountryDetailCtrl', ['$scope', '$routeParams', function ($scope, $routeParams) {
  $scope.name = $routeParams.countryName;
}]);