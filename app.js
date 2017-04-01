var myApp = angular.module('myApp', []);

myApp.controller('myAppController', ['$scope', function myAppController($scope) {
  $scope.name = 'Kuba';
  $scope.surname = 'Matyka';
  $scope.greetings = 'Hello!'
}]);