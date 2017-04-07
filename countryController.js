var countryControllers = angular.module('countryControllers', []);

countryControllers.controller('CountryListCtrl', ['$scope', 'countries',
  function ($scope, countries) {
    countries.list(function (countries) {
      $scope.countries = countries;
    })
  }]);

countryControllers.controller('CountryDetailCtrl', ['$scope', '$routeParams', 'countries',
  function ($scope, $routeParams, countries) {
    countries.find($routeParams.countryId, function (country) {
      $scope.country = country;
    });

    $scope.goBack = function () {
      window.history.back();
    }
  }]);