'use strict';

var countryApp = angular.module('countryApp', [
  'ngRoute'
]);

countryApp.config(['$routeProvider', function($routeProvider) {
  $routeProvider
    .when('/', {
      template: '<ul><li ng-repeat="country in countries">{{ country.name }}</li></ul>',
      controller: 'CountryListCtrl'
    })
    .when('/:countryName', {
      template: 'wait',
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
  console.log($routeParams);
}]);