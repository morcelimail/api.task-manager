'use strict';

const Joi = require('joi');

module.exports = {
  id: Joi.number().min(1).required(),
  title: Joi.string().min(1).max(256).required(),
  description: Joi.string().min(1).max(1024).required(),
  status: Joi.string().valid(
    'pending',
    'inProgress',
    'done',
    'deleted'
  ).required(),
  createdAt: Joi.string().min(10).optional().allow(null),
  updatedAt: Joi.string().min(10).optional().allow(null),
  deletedAt: Joi.string().min(10).optional().allow(null),
};
