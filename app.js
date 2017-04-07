// Introduce asynchronous behaviour to our directive and create a controller for a directive.

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
    // Inject $scope and a countries service
    // Take a look at the console and remember about $$hashKey. NgRepeat directive creates this key each time it is
    // executed.
    controller: function ($scope, countries) {
      console.log($scope.country);
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