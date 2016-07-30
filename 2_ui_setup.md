# User Interface Setup

In this assignment, you will design and build the user interface using Angular and Materialize. The aesthetic and design decisions are up to you, but the core functionality should include:

* Topics:
  * The ability to create a new topic complete with Angular form validation
  * The topic name is required
  * The topic name must be at least 3 characters

* Posts:
  * Up/Down voting
  * The ability to create a new post complete with Angular form validation
  * All input fields are required
  * Topics can be chosen from a select input
  * Title must be at least 3 characters
  * Image url must be a valid url
  * Description must be between 3 and 60 characters

Using what you learned this week about built-in Angular directives and filters, include at least the following:

* Directives
  * `ng-model`
  * `ng-repeat`
  * `ng-hide` or `ng-show`
  * `ng-class`
  * `ng-click`
  * `ng-submit`

**Hint**: Feel free to use more built-in directives as you'd like to add value to the user experience. (`ng-disabled`, `ng-if`, `ng-messages`, etc.)

* Filters
  * `orderBy`: The default order for the posts should be from highest to lowest rating
  * `date`: Feel free to use whatever date format you'd like
  * `filter`: Users should be able to filter the posts by topic (id)

Since you won't be able to obtain the data from your database yet, use the following snippets as hard data in your controllers for your topics and posts.

```JavaScript
const topics = [
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

const posts = [
  {
    "created_at": "2016-06-20T14:26:16.000Z",
    "description": "What an awesome story.",
    "id": 1,
    "image_url": "https://b.thumbs.redditmedia.com/WTeAOJlQ98AfIVn7BjV_cDrDLXMuowwmJVo1p1xX5yg.jpg",
    "rating": 6,
    "title": "Dogs Are Not Allowed On NYC Subway Unless They're In A Carrier… So This Happened",
    "topic_id": 1,
    "updated_at": "2016-07-23T14:26:16.000Z",
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
```

## Bonus

* Add another custom filter that allows users to sort the posts by other properties than rating (date, reverse rating, title, etc.)
* Add a search field that allows users to search all posts
* Add a select input that allows users to search only certain properties of posts (title, description, date, etc.)
* Add tests for your routes using Mocha, Chai, and supertest.
