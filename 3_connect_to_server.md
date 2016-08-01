# Connect to Server

In this assignment, you will connect the client application you have been working on to the server application you have created.

## Requirements

* If you have not already, expose your client via `express.static`
* Remove any hard coded data into your application that you will obtain from the server (topics, posts, users).
* Use the `$http` service to make connections to your server for posts, topics, and user registration (not authentication). Feel free to place these calls in the controllers. You will extract these calls out into custom services in the next assignment.
* Add client side routing for at least two pages. It is recommended that API calls begin with a `/api/` to avoid conflict between what is your client routes and what is your server routes.

It is recommended to *not* specify the host with retrieving data from the server. For example, instead of doing the following below:

```javascript
// Don't do this!
$http.get('http://localhost:8000/api/posts')
  .then((response) => {
    // Work with response
  })
  .catch((err) => {
    // Work with error
  })
```

Do this instead.

```javascript
// Do this!
$http.get('/api/posts')
  .then((response) => {
    // Work with response
  })
  .catch((err) => {
    // Work with error
  })
```
