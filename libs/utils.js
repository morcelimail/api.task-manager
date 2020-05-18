'use strict';

const Joi = require('joi');

/**
 * Parse string from kebab case to camel case style.
 * @param {String} expression 
 * @return {String} Operation result.
 */
module.exports.kebabToCamel = (expression) => {
  return expression.replace(/-([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

/**
 * Parse string from camel case to kebab case style.
 * @method camelToKebab
 * @param {String} expression 
 * @return {String} Operation result.
 */
module.exports.camelToKebab = (expression) => {
  return expression.replace(/([a-z][A-Z])/g,  (g) => {
    return g[0] + '-' + g[1].toLowerCase();
  });
};

/**
 * Parse string from kebab case to camel case style.
 * @method snakeToCamel
 * @param {String} expression 
 * @return {String} Operation result.
 */
module.exports.snakeToCamel = (expression) => {
  return expression.replace(/_([a-z])/g, (g) => {
    return g[1].toUpperCase();
  });
};

/**
 * Parse string from kebab case to camel case style.
 * @method validate
 * @param {Object} data Object data to be validated. 
 * @param {Object} schema Schema Object.
 * @return {String} Existing error (null if it's ok).
 */
module.exports.validate = (data, schema) => {
  const result = Joi.validate(data, schema);
  if(!result.error) {
    return null;
  }

  return result.error.details[0].message;
};

/**
 * Simple shorthand to HTTP Bad Request Error.
 * @method badImplementation
 * @param {Object} res Node HTTP response object.
 * @param {String} msg Message to be sent.
 * @return {Object} JSON object containing the message e.g: { "message": "something is wrong" }
 */
module.exports.badImplementation = (res, msg) => {
  res.status(500).json({ message: msg });
};

/**
 * Simple shorthand to HTTP Internal Server Error.
 * @method badImplementation
 * @param {Object} res Node HTTP response object.
 * @param {String} msg Message to be sent.
 * @return {Object} JSON object containing the message e.g: { "message": "something is wrong" }
 */
module.exports.badRequest = (res, msg) => {
  res.status(400).json({ message: msg });
};