'use strict';

const app =  angular.module('blueitApp');

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
    templateUrl: 'postForm.html'
  };
});

app.directive('nhRegistrationForm', () => {
  return {
    temaplateUrl: 'registrationForm.html'
  };
});
