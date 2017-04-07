// Extract controllers into separate file

'use strict';

// Register country controllers
var countryApp = angular.module('countryApp', [
  'ngRoute',
  'countryControllers'
]);

countryApp.config(['$routeProvider', function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'country-list.html',
      controller: 'CountryListCtrl'
    })
    .when('/:countryId', {
      templateUrl: 'country-detail.html',
      controller: 'CountryDetailCtrl'
    })
    .otherwise({
      redirect: '/'
    })
}]);

countryApp.factory('countries', ['$http', function ($http) {
  return {
    list: function (callback) {
      $http({
        method: 'GET',
        url: 'countries.json',
        cache: true
      }).success(callback);
    },
    find: function (id, callback) {
      $http({
        method: 'GET',
        url: 'country_' + id + '.json',
        cache: true
      }).success(callback)
    }
  };
}]);

countryApp.directive('country', function () {
  return {
    restrict: 'A',
    scope: {
      country: '='
    },
    templateUrl: 'country.html',
    controller: function ($scope, countries) {
      countries.find($scope.country.id, function (country) {
        $scope.country.flag = country.flag;
      });
    }
  };
});