/* eslint-disable strict, no-undef */

(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.config(($routeProvider) => {
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
      })
      .when('/login', {
        templateUrl: 'login.html',
        controller: 'AuthCtrl',
        controllerAs: 'authCtrl'
      })
      .when('/register', {
        templateUrl: 'register.html',
        controller: 'UserCtrl',
        controllerAs: 'users'
      });
  });
})();
