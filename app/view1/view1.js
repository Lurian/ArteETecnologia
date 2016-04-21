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
  $scope.myInterval = 5000;
  $scope.noWrapSlides = false;
  $scope.active = 0;
  $scope.access_token;

  var slides = $scope.slides = [];
  var currIndex = 0;

  $scope.addSlide = function() {
    var newWidth = 600 + slides.length + 1;
    slides.push({
      image: 'http://lorempixel.com/' + newWidth + '/300',
      text: ['Nice image','Awesome photograph','That is so cool','I love that'][slides.length % 4],
      id: currIndex++
    });
  };

  $scope.redirectInstagram = function(){
    $window.location.href = 'https://api.instagram.com/oauth/authorize/?client_id=4ffeb7f0f089438887d9413010d67708' +
    '&redirect_uri=http://localhost:8000/app/?this=&response_type=token';
  }

  $scope.showUrl = function(){
    console.log($location.absUrl());
  }

  $scope.getAccessToken = function(){
    var urlSplit = $location.absUrl().split("access_token=");
    var token = urlSplit[urlSplit.length -1];
     $scope.access_token = token;
     console.log(token);
  }

  $scope.randomize = function() {
    var indexes = generateIndexesArray();
    assignNewIndexesToSlides(indexes);
  };

  for (var i = 0; i < 4; i++) {
    $scope.addSlide();
  }

  // Randomize logic below

  function assignNewIndexesToSlides(indexes) {
    for (var i = 0, l = slides.length; i < l; i++) {
      slides[i].id = indexes.pop();
    }
  }

  function generateIndexesArray() {
    var indexes = [];
    for (var i = 0; i < currIndex; ++i) {
      indexes[i] = i;
    }
    return shuffle(indexes);
  }

  // http://stackoverflow.com/questions/962802#962890
  function shuffle(array) {
    var tmp, current, top = array.length;

    if (top) {
      while (--top) {
        current = Math.floor(Math.random() * (top + 1));
        tmp = array[current];
        array[current] = array[top];
        array[top] = tmp;
      }
    }

    return array;
  }
});