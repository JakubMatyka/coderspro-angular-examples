// Create a custom directive

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

// Minimum config to make this work
// We have a list of countries and each element of this list is executing some logic like fetching data from JSON file
// for that particular country

countryApp.directive('country', function(){
  return {
    // restrict to use it as an attribute
    restrict: 'A',
    // By declaring scope property we isolate the scope of our directive from other part of our code.
    // A bi-directional binding can be set up between the local scope property and the parent property using the = symbol.
    // If the parent model changes, just like in normal data-binding then the local property will reflect the change.
    // What happens here is a country from parent in country list passes a data to nested element and binds them.
    // And because of that in our template for directive we can refer to that variable.
    scope: {
      country: '='
    },
    templateUrl: 'country.html'
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