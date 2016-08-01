(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.config(function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'home.html',
        controller: 'PostCtrl',
        controllerAs: 'posts'
      })
      .when('/posts', {
        templateUrl: 'submitPost.html',
        controller: 'PostCtrl',
        controllerAs: 'posts'
      });
  });
})();
