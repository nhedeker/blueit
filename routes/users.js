'use strict';

const express = require('express');
const { camlizeKeys, decamelizeKeys } = require('humps');
const ev = require('express-validation');
const validations = require('../validations/users');
const boom = require('boom');
const bcrypt = require('bcrypt-as-promised');
const knex = require('../knex');

const router = express.Router();

router.post('/user', ev(validations.post), (req, res, next) => {
  const { username, password, firstName, lastName } = req.body;

  knex('users')
    .select(knex.raw('1=1'))
    .where('username', username)
    .first()
    .then((exists) => {
      if (exists) {
        throw (boom.create(400, 'Username already exists.'));
      }

      return bcrypt.hash(password, 12));
    )
    .then((hashedPassword) => {
      const newUser = { username, hashedPassword, firstName, lastName};

      const row = decamelizeKeys(newUser);

      return knex('users').insert(row, '*');
    })
    .then((rows) => {
      const user = camlizeKeys(rows[0]);

      delete user.hashedPassword;

      res.send(user);
    })
    .catch((err) => {
      next(err);
    });
});

module.exports = router;
