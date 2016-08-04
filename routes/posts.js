'use strict';

const express = require('express');
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/posts');
const { camelizeKeys, decamelizeKeys } = require('humps');
const boom = require('boom');
const { checkAuth } = require('../middleware');

const router = express.Router();

router.get('/api/posts', (_req, res, next) => {
  knex('posts')
    .orderBy('title')
    .orderBy('rating')
    .then((rows) => {
      const posts = camelizeKeys(rows);

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/posts/topic:topicId', (req, res, next) => {
  const topicId = Number.parseInt(req.params.id);

  if (Number.isNaN(topicId)) {
    return next(boom.create(400, 'Invalid Topic Id'));
  }

  knex('topics')
    .where('id', topicId)
    .first()
    .then((topic) => {
      if (!topic) {
        throw boom.create(404, 'Topic Not Found');
      }

      return knex('posts')
        .where('topic_id', topic.id)
        .orderBy('updated_at');
    })
    .then((rows) => {
      const posts = camelizeKeys(rows);

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/api/posts', checkAuth, ev(validations.post), (req, res, next) => {
  const { title, imageUrl, description, topicId } = req.body;
  const { userId } = req.token;

  const newPost = { title, imageUrl, description, topicId, userId };

  const row = decamelizeKeys(newPost);

  knex('posts')
    .insert(row, '*')
    .then((rows) => {
      const post = camelizeKeys(rows[0]);

      res.send(post);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
