/* eslint-disable strict, no-undef, max-statements, no-use-before-define, func-style, no-alert, max-len */

(function() {
  'use strict';

  const app = angular.module('blueitApp');

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
        alert(err.data);
        throw err;
      });
    };

    activate();
  }

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
          alert(err.data);
          throw err;
        });
    };

    this.thumbsUp = (post) => {
      post.rating += 1;
    };

    this.thumbsDown = (post) => {
      post.rating -= 1;
    };

    const activate = () => {
      postsSvc.getPosts().then((posts) => {
        this.data = posts;
      })
      .catch((err) => {
        alert(err.data);
        throw err;
      });
    };

    activate();
    $scope.$watch('sortBy', () => {
      $('select').material_select();
    });
  }

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
        .then((_user) => {
          $location.path('/');
          this.username = '';
          this.password = '';
        })
        .catch((err) => {
          alert('Login Failed');
          throw err;
        });
    };

    this.logout = () => {
      this.username = '';
      this.password = '';
      authSvc.logout();
    };
  }

  // NEW FILE
  app.controller('UserCtrl', UserCtrl);

  UserCtrl.$inject = ['userSvc', 'authSvc', '$location'];

  function UserCtrl(userSvc, authSvc, $location) {
    this.data = [];
    this.userForm = {};

    // this.usernameExists = false;

    // this.userExists = () => {
    //   this.temp = this.data.filter((element) => {
    //     return element.username === this.userForm.username;
    //   });
    //
    //   if (this.temp.length > 0) {
    //     return true;
    //   }
    //
    //   return false;
    // };

    this.registerUser = () => {
      // if (this.userExists()) {
      //   this.usernameExists = true;
      //   return;
      // }
      authSvc.registerUser({
        username: this.userForm.username,
        password: this.userForm.password,
        firstName: this.userForm.firstName,
        lastName: this.userForm.lastName
      })
        .then((user) => {
          // this.usernameExists = false;
          this.data.push(user);
          authSvc.login(user.username, this.userForm.password)
            .then((_resUser) => {
              $location.path('/');
              this.userForm = {};
            })
            .catch((err) => {
              alert('Login Failed');
              throw err;
            });
        })
        .catch((err) => {
          alert(err.data);

          // this.usernameExists = true;
          // materialize.toast(err.data, 400);
          throw err;
        });
    };

    const activate = () => {
      userSvc.getUsers().then((users) => {
        this.data = users;
      })
      .catch((err) => {
        alert(err.data);
        throw err;
      });
    };

    activate();
  }
})();
