'use strict';

const express = require('express');
const { camelizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/users');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');

const router = express.Router();

router.post('/api/user', ev(validations.post), (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('username', username)
    .first()
    .then((exists) => {
      if (exists) {
        throw (boom.create(409, 'Username already exists.'));
      }

      return bcrypt.hash(password, 12);
    })
    .then((hashedPassword) => {
      const newUser = { username, hashedPassword, firstName, lastName};

      const row = decamelizeKeys(newUser);

      return knex('users').insert(row, '*');
    })
    .then((rows) => {
      const user = camelizeKeys(rows[0]);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/api/users', (_req, res, next) => {
  knex('users')
    .orderBy('id')
    .then((rows) => {
      const topics = camelizeKeys(rows);

      res.send(topics);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
