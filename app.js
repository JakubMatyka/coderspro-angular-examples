var myApp = angular.module('myApp', []);

myApp.controller('myAppController', ['$scope', function myAppController($scope) {
  $scope.names = ['Asia', 'Kasia', 'Zosia'];

  $scope.addName = function () {
    $scope.names.push($scope.inputName);
    $scope.inputName = '';
  }
}]);