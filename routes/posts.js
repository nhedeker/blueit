'use strict';

const express = require('express');
const knex = require('../knex');
const ev = require('express-validation');
const validations = require('../validations/posts');
const { camelizeKeys, decamelizeKeys } = require('humps');
const boom = require('boom');

const router = express.Router();

router.get('/posts', (_req, res, next) => {
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

router.get('/posts/topic:id', (req, res, next) => {
  const id = Number.parseInt(req.params.id);

  if (Number.isNaN(id)) {
    return next(boom.create(400, 'Request parameter id must be a valid id topic id'));
  }

  knex('topics')
    .where('id', id)
    .first()
    .then((topic) => {
      if (!topic) {
        throw boom.create(404, 'Not Found');
      }

      return knex('posts')
        .where('topic_id', topic.id)
        .orderBy('updated_at');
    })
    .then((rows) => {
      if (rows.length <= 0) {
        res.send('No posts have been created under that topic');
      }
      const posts = camelizeKeys(rows);

      res.send(posts);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/posts', ev(validations.post), (req, res, next) => {
  const { title, imageUrl, description, topicId } = req.body;
  const userId = 1;
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
