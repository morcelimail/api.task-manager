'use strict';

const Async = require('async');
const _ = require('lodash');

const {
  libs,
  models,
  schemas
} = require('globals');
const Op = models.Sequelize.Op;

module.exports = {
  method: 'post',
  path: '/tasks/create',
  handler: (req, res) => {
    const schema = _.pick(schemas.tasks, [
      'title',
      'description'
    ]);
  
    // validate the request
    const error = libs.utils.validate(req.body, schema);
    if (Boolean(error)) {
      return libs.utils.badRequest(res, error);
    }
  
    // try to create the new registry
    const createData = {
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      status: 'pending'
    };
  
    models.tasks
    .create(createData)
    .then(task => {
      res.json(models.tasks.filter(task));
    })
    .catch(() => {
      libs.utils.badImplementation(res, 'Error on try to create task');
    });
  }
};
