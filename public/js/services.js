(function() {
  'use strict';

  const app = angular.module('blueitApp');
  const server="/api";

  app.factory('topicsSvc', topicsSvc);
  app.factory('postsSvc', postsSvc);

  topicsSvc.$inject = ['$http'];
  postsSvc.$inject = ['$http'];

  function topicsSvc($http) {
    return {
      submitTopic: (topicName) => {
        return $http.post(`${server}/topics`, {
          name: topicName
          })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
      getTopics: () => {
        return $http.get(`${server}/topics`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  };

  function postsSvc($http) {
    return {
      submitPost: (post) => {
        return $http.post(`${server}/posts`, post)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
      getPosts: () => {
        return $http.get(`${server}/posts`)
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      }
    };
  };
})();
