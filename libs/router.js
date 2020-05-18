'use strict';

const path = require('path');
const read = require('fs-readdir-recursive');
const _ = require('lodash');
const express = require('express');

const router = express.Router();

/**
 * @class
 * Class lib to handle routes.
 */
class Router {

  /**
   * Generate routes from a base path.
   * @param {Object} app
   * @param {String} basepath 
   */
  generate(app, basepath=__dirname) {
    const filepathList = read(basepath);
  
    filepathList.forEach(filepath => {
      const file = require(path.join(basepath, filepath));
      let args = [file.path];

      // add all config information from file.
      args.push((req, res, next) => {
        req.config = _.omit(file, 'handler');
        next();
      });

      args.push(file.handler);

      router[file.method].apply(router, args);

    });

    app.use('/', router);
  }
}

let instance = null;
module.exports = (() => {
  if (!instance) { instance = new Router(); }
  return instance;
})();
