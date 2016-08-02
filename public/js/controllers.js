(function() {
  'use strict';

  const app = angular.module('blueitApp');
  const server="/api";

  // NEW FILE
  app.controller('TopicCtrl', TopicCtrl);

  TopicCtrl.$inject = ['topicsSvc'];

  function TopicCtrl(topicsSvc) {
    this.topicForm = {};
    this.data = [];

    this.submitTopic = () => {
      topicsSvc.submitTopic(this.topicForm.name)
        .then((topic) => {
          this.data.push(topic);
          $('#topicTrigger').closeModal();
          this.topicForm = {};
        })
        .catch((err) => {
          throw err;
        });
    };

    const activate = () => {
      topicsSvc.getTopics().then((topics) => {
        this.data = topics;
      })
      .catch((err) => {
        throw err;
      });
    };

    activate();
  };

  // NEW FILE
  app.controller('PostCtrl', PostCtrl);

  PostCtrl.$inject = ['$scope', 'postsSvc'];

  function PostCtrl($scope, postsSvc) {
    this.data = [];
    this.filterBy = '';
    this.sortBy = '-rating';
    this.postForm = {};

    this.submitPost = () => {
      postsSvc.submitPost({
        description: this.postForm.description,
        title: this.postForm.title,
        topicId: Number.parseInt(this.postForm.topicId),
        imageUrl: this.postForm.imgUrl,
        userId: 1
        })
        .then((post) => {
          this.data.push(post);
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
      postsSvc.getPosts().then((posts) => {
        this.data = posts;
      })
      .catch((err) => {
        throw err;
      });
    };

    activate();
    $scope.$watch('sortBy', () => {
      $('select').material_select();
    });
  };
})();
