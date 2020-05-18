'use strict';

const joi = require('joi');

module.exports = {
  id: joi.number().min(1).required(),
  title: joi.string().min(1).max(256).required(),
  description: joi.string().min(1).max(1024).required(),
  status: joi.string().allow(
    'pending',
    'inProgress',
    'done',
    'deleted'   
  ).required(),
  createdAt: joi.string().min(10).optional().allow(null),
  updatedAt: joi.string().min(10).optional().allow(null),
  deletedAt: joi.string().min(10).optional().allow(null),
};
