(function() {
  'use strict';

  const app = angular.module('blueitApp');
  const server="/api";

  app.factory('topicsSvc', topicsSvc);
  app.factory('postsSvc', postsSvc);
  app.factory('authSvc', authSvc);

  topicsSvc.$inject = ['$http'];
  postsSvc.$inject = ['$http'];
  authSvc.$inject = ['$http'];

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

  function authSvc($http) {
    return {
      login: (username, password) => {
        return $http.post(`${server}/token`, { username, password })
          .then((res) => {
            return res.data;
          })
          .catch((err) => {
            throw err;
          });
      },
      logout: () => {
        return $http.delete(`${server}/token`)
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
