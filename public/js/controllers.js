(function() {
  'use strict';

  const server="/api";

  const app = angular.module('blueitApp');

  // NEW FILE
  app.controller('TopicCtrl', TopicCtrl);

  TopicCtrl.$inject = ['$http'];

  function TopicCtrl($http) {
    this.topicForm = {};
    this.data = [];

    this.submitTopic = () => {
      return $http.post(`${server}/topics`, {
        name: this.topicForm.name
        })
        .then((res) => {
          this.data.push(res.data);
          $('#topicTrigger').closeModal();
          this.topicForm = {};
        })
        .catch((err) => {
          throw err;
        });
    };

    const activate = () => {
      return $http.get(`${server}/topics`)
        .then((topics) => {
          this.data = topics.data
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  };

  // NEW FILE
  app.controller('PostCtrl', PostCtrl);

  PostCtrl.$inject = ['$http'];

  function PostCtrl($http) {
    this.data = [];
    this.filterBy = '';
    this.sortBy = '-rating';
    this.postForm = {};

    this.submitPost = () => {
      return $http.post(`${server}/posts`, {
        description: this.postForm.description,
        title: this.postForm.title,
        topicId: Number.parseInt(this.postForm.topicId),
        imageUrl: this.postForm.imgUrl,
        userId: 1
        })
        .then((res) => {
          this.data.push(res.data);
          this.postForm = {};
        })
        .catch((err) => {
          throw err;
        });
    };

    this.thumbsUp = (post) => {
      post.rating++;
    };

    this.thumbsDown = (post) => {
      post.rating--;
    };

    const activate = () => {
      return $http.get(`${server}/posts`)
        .then((posts) => {
          this.data = posts.data;
        })
        .catch((err) => {
          throw err;
        });
    };

    activate();
  };
})();
