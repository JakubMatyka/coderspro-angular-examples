// Show the flag in the listing for each country.

'use strict';

var countryApp = angular.module('countryApp', [
  'ngRoute'
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
    // Call the service find method. Pass the id and a function as a callback and assign flag url
    controller: function ($scope, countries) {
      countries.find($scope.country.id, function (country) {
        $scope.country.flag = country.flag;
      });
    }
  };
});

countryApp.controller('CountryListCtrl', ['$scope', 'countries',
  function ($scope, countries) {
    countries.list(function (countries) {
      $scope.countries = countries;
    })
  }]);

countryApp.controller('CountryDetailCtrl', ['$scope', '$routeParams', 'countries',
  function ($scope, $routeParams, countries) {
    countries.find($routeParams.countryId, function (country) {
      $scope.country = country;
    });

    $scope.goBack = function () {
      window.history.back();
    }
  }]);