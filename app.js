// Looping with ngRepeat

var myApp = angular.module('myApp', []);

myApp.controller('myAppController', ['$scope', function myAppController($scope) {
  $scope.names = ['Asia', 'Kasia', 'Zosia'];
}]);