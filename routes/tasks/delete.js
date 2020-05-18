'use strict';

const Async = require('async');

const {
  libs,
  models,
  schemas
} = require('globals');
const Op = models.Sequelize.Op;

module.exports = {
  method: 'delete',
  path: '/tasks/:id/delete',
  handler: (req, res) => {
    // validate the request
    const error = libs.utils.validate(req.params, { id: schemas.tasks.id });
    if (Boolean(error)) {
      return libs.utils.badRequest(res, error);
    }

    Async.waterfall([
      next => next(null, { task: null }),

      // find an existing registry
      (data, next) => {

        const options = {
          where: {
            id: req.params.id,
            status: { [Op.ne] : 'deleted' }
          }
        };

        models.tasks
        .findOne(options)
        .then(task => {
          if (!task) {
            next({
              status: 400,
              message: 'Registry no found'
            }, data);
            return;
          }

          data.task = task;
          next(null, data);
        })
        .catch(() => {
          next({
            status: 500,
            message: 'Error on try to find registry'
          }, data);
        });
        
      },

      // try to update the existing registry
      (data, next) => {      
        data.task.status = 'deleted';
        data.task.deletedAt = new Date();

        data.task
        .save()
        .then(task => {
          data.task = task;
          next(null, data);
        })
        .catch(() => {
          next({
            status: 500,
            message: 'Error on try to delete registry'
          }, data);
        });
      }
    ], (error, data) => {

      if (error) {
        if (error.status === 500) {
          return libs.utils.badImplementation(res, error.message);
        }
        return libs.utils.badRequest(res, error.message);
      }
    
      res.json(models.tasks.filter(data.task));
    });
  }
};
