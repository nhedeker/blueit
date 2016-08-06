/* eslint-disable no-undef */

'use strict';

const app = angular.module('blueitApp');

app.directive('nhPosts', () => {
  return {
    controller: 'PostCtrl as posts',
    templateUrl: 'post-details.html',
    scope: {
      postInDirective: '=postAttribute'
    }
  };
});

app.directive('nhPostsForm', () => {
  return {
    controller: 'PostCtrl as posts',
    templateUrl: 'postForm.html'
  };
});

app.directive('nhRegistrationForm', () => {
  return {
    contoller: 'UserCtrl as users',
    templateUrl: 'registrationForm.html'
  };
});
