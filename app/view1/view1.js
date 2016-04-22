angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/:access_token', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });

  $routeProvider.when('/', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
 
}])

.controller('View1Ctrl', function($scope, $window, $location) {

  $scope.showImage = false;
  $scope.showQR = false;

  $scope.stringqr = '';

  $scope.isImage = function() {
    var image = new Image();
    console.log("show imagem: " +  $scope.showImage)
    image.onerror = function() {
         $scope.showImage = false;
           $scope.showQR = false;
         $scope.$apply();
    };
    image.onload = function() {
         $scope.showImage = true;
         $scope.showQR = true;
         $scope.$apply();
    };
    image.src = $scope.stringqr;
}
});