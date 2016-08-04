'use strict';

const app =  angular.module('blueitApp');

app.directive('nhPosts', () => {
  return {
    templateUrl: 'post-details.html',
    scope: {
      postInDirective: '=postAttribute'
    }
  };
});

app.directive('nhPostsForm', () => {
  return {
    templateUrl: 'postForm.html'
  }
})
