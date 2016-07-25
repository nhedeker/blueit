'use strict';

const Joi = require('joi');

module.exports.post = {
  body: {
    name: Joi.string()
      .min(3)
      .max(255)
      .label('name')
      .trim()
      .required()
  }
};
