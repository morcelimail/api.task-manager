'use strict';

const Joi = require('joi');

module.exports.kebabToCamel = (expression) => {
  return expression.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

module.exports.camelToKebab = (expression) => {
  return expression.replace(/([a-z][A-Z])/g,  (g) => {
    return g[0] + '-' + g[1].toLowerCase();
  });
};

module.exports.snakeToCamel = (expression) => {
  return expression.replace(/_([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

module.exports.validate = (data, schema) => {
  const result = Joi.validate(data, schema);
  if(!result.error) {
    return null;
  }

  return result.error.details[0].message;
};

module.exports.badImplementation = (res, msg) => {
  res.status(500).json({ message: msg });
};

module.exports.badRequest = (res, msg) => {
  res.status(400).json({ message: msg });
};