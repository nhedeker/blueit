(function() {
  'use strict';

  const app = angular.module('blueitApp');

  app.controller('TopicCtrl', function() {
    this.topicForm = {};

    this.submitTopic = () => {
      this.data.push({
        name: this.topicForm.name,
        id : this.data.length + 1
      });

      $('#topicTrigger').closeModal();
      this.topicForm = {};
    };

    this.data = [
      {
        id: 1,
        name: 'Dogs'
      },
      {
        id: 2,
        name: 'Cats'
      },
      {
        id: 3,
        name: 'Table Tennis'
      }
    ];
  });

  app.controller('PostCtrl', function() {

    this.filterBy = '';
    this.sortBy = '-rating';
    this.postForm = {};

    this.submitPost = () => {
      console.log('id' + this.postForm.topicId);
      const now = Date.now();
      this.data.push({
        id: this.data.length + 1,
        description: this.postForm.description,
        rating: 0,
        title: this.postForm.title,
        topic_id: Number.parseInt(this.postForm.topicId),
        image_url: this.postForm.imgUrl,
        user_id: 1,
        created_at: now,
        updated_at: now
      });

      console.log(this.data[this.data.length - 1].created_at);
      console.log(this.data);

      $('#postTrigger').closeModal();
      this.postForm = {};
    };

    this.thumbsUp = (post) => {
      post.rating++;
    };

    this.thumbsDown = (post) => {
      post.rating--;
    };

    this.data = [
      {
        "created_at": new Date("2016-06-20T14:26:16.000Z").getTime(),
        "description": "What an awesome story.",
        "id": 1,
        "image_url": "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
        "rating": 6,
        "title": "Dogs Are Not Allowed On NYC Subway Unless They're In A Carrier… So This Happened",
        "topic_id": 1,
        "updated_at": new Date("2016-07-23T14:26:16.000Z").getTime(),
        "user_id": 1
      },
      {
        "created_at": "2016-07-04T14:26:16.000Z",
        "description": "What an awesome story.",
        "id": 2,
        "image_url": "https://a.thumbs.redditmedia.com/pl1fM2jukfU2xW6hamMUF5dJ5gC_igj-1Z2oMwQM_90.jpg",
        "rating": 2,
        "title": "Wagging That Tail",
        "topic_id": 1,
        "updated_at": "2016-07-23T14:26:16.000Z",
        "user_id": 1
      },
      {
        "created_at": "2016-06-28T14:26:16.000Z",
        "description": "What an awesome story.",
        "id": 3,
        "image_url": "https://b.thumbs.redditmedia.com/9kZ1Hw7MF6zW41tvpivIswSVHzRehsP05friQEgaaYo.jpg",
        "rating": -8,
        "title": "My Friend Got a New Phone Case",
        "topic_id": 2,
        "updated_at": "2016-07-23T14:26:16.000Z",
        "user_id": 1
      },
      {
        "created_at": "2016-05-13T14:26:16.000Z",
        "description": "What an awesome story.",
        "id": 4,
        "image_url": "https://b.thumbs.redditmedia.com/AKy_8KjGjoeeq8CoYxjbWiFTsL2IR6Dh_VMbR1_ddnY.jpg",
        "rating": 0,
        "title": "Okay fine, you can have one more piece of chicken...",
        "topic_id": 2,
        "updated_at": "2016-07-23T14:26:16.000Z",
        "user_id": 1
      },
      {
        "created_at": "2016-07-11T14:26:16.000Z",
        "description": "What an awesome story.",
        "id": 5,
        "image_url": "https://b.thumbs.redditmedia.com/e-zhbAm5T-zELHrhRNYLV12l2fAgcqoM-yMF-IPUE6I.jpg",
        "rating": 3,
        "title": "The look of complete satisfaction",
        "topic_id": 2,
        "updated_at": "2016-07-23T14:26:16.000Z",
        "user_id": 1
      },
      {
        "created_at": "2016-07-25T14:26:16.000Z",
        "description": "What an awesome story.",
        "id": 6,
        "image_url": "http://www.toysrus.com/graphics/product_images/pTRU1-22957329v150.jpg",
        "rating": -2,
        "title": "Crazy Spin",
        "topic_id": 3,
        "updated_at": "2016-07-23T14:26:16.000Z",
        "user_id": 1
      },
      {
        "created_at": "2016-06-18T14:26:16.000Z",
        "description": "What an awesome story.",
        "id": 7,
        "image_url": "http://blog.uberpong.com/wp-content/uploads/2012/11/Impossible-table-tennis-shot-dive-150x150.png",
        "rating": 12,
        "title": "Anyone here play in any clubs in Chicago?",
        "topic_id": 3,
        "updated_at": "2016-07-23T14:26:16.000Z",
        "user_id": 1
      }
    ];
  });
})();
