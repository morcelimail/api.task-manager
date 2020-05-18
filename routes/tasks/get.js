'use strict';

const {
  libs,
  models,
  schemas
} = require('globals');
const Op = models.Sequelize.Op;

module.exports = {
  method: 'get',
  path: '/tasks/:id/get',
  handler: (req, res) => {
    // validate the request
    const error = libs.utils.validate(req.params, { id: schemas.tasks.id });
    if (Boolean(error)) {
      return libs.utils.badRequest(res, error);
    }
  
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
        return libs.utils.badRequest(res, 'Registry not found');
      }
      res.json(models.tasks.filter(task));
    })
    .catch(() => {
      libs.utils.badImplementation(res, 'Error on try find task');
    });
  }
};
