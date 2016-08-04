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

  PostCtrl.$inject = ['$scope', 'postsSvc', '$location'];

  function PostCtrl($scope, postsSvc, $location) {
    this.data = [];
    this.filterBy = '';
    this.sortBy = '-rating';
    this.postForm = {};

    this.submitPost = () => {
      postsSvc.submitPost({
        description: this.postForm.description,
        title: this.postForm.title,
        topicId: Number.parseInt(this.postForm.topicId),
        imageUrl: this.postForm.imgUrl
        })
        .then((post) => {
          this.data.push(post);
          this.postForm = {};
          $location.path('/');
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

  // NEW FILE
  app.controller('AuthCtrl', AuthCtrl);

  AuthCtrl.$inject = ['authSvc', '$location', '$cookies'];

  function AuthCtrl(authSvc, $location, $cookies) {
    this.username = '';
    this.password = '';

    this.isLoggedIn = () => {
      return $cookies.get('loggedIn');
    };

    this.login = () => {
      authSvc.login(this.username, this.password)
        .then((user) => {
          $location.path('/');
          this.username = '';
          this.password = '';
        })
        .catch((err) => {
          alert('Login Failed');
        });
    };

    this.logout = () => {
      this.username = '';
      this.password = '';
      authSvc.logout();
    };
  };
})();
