'use strict';

const express = require('express');
const knex = require('../knex');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/topics');
const { checkAuth } = require('../middleware');

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/api/topics', (_req, res, next) => {
  knex('topics')
    .orderBy('id')
    .then((rows) => {
      const topics = camelizeKeys(rows);

      res.send(topics);
    })
    .catch((err) => {
      next(err);
    });
});

// eslint-disable-next-line max-len
router.post('/api/topics', checkAuth, ev(validations.post), (req, res, next) => {
  const { name } = req.body;
  const row = decamelizeKeys({ name });

  knex('topics')
    .insert(row, '*')
    .then((rows) => {
      const topic = camelizeKeys(rows[0]);

      res.send(topic);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
