'use strict';

const express = require('express');
const knex = require('../knex');
const { camlizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/topics');

const router = express.Router();

router.get('/topics', (_req, res, next) => {
  knex('topics')
    .orderBy('name')
    .then((rows) => {
      const topics = camlizeKeys(rows);

      res.send(topics);
    })
    .catch((err) => {
      next(err);
    });
});

router.post('/topics', ev(validations.post), (req, res, next) => {
  const { name } = req.body;
  const newTopic = { name };
  const row = decamelizeKeys(newTopic);

  knex('topics')
    .insert(row, '*')
    .then((rows) => {
      const topic = camlizeKeys(rows[0]);

      res.send(topic);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
