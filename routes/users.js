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
        throw (boom.create(400, 'Username is already taken.'));
      }

      return bcrypt.hash(password, 12));
    )
    .then((has))
});

module.exports = router;
