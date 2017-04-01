var myApp = angular.module('myApp', []);

myApp.controller('myAppController', ['$scope', function myAppController($scope) {
  $scope.names = ['Asia', 'Kasia', 'Zosia'];

  $scope.addName = function () {
    $scope.names.push($scope.inputName);
    $scope.inputName = '';
  }
  
  $scope.removeName = function (nameText) {
    var i = $scope.names.indexOf(nameText);
    $scope.names.splice(i, 1);
  }
}]);