'use strict';

const {
  libs,
  models
} = require('globals');
const Op = models.Sequelize.Op;

module.exports = {
  method: 'get',
  path: '/tasks/list',
  handler: (req, res) => {
    const options = {
      where: {
        status: { [Op.ne] : 'deleted' }
      },
      order: [['id', 'ASC']]
    };
  
    models.tasks
    .findAll(options)
    .then(list => {
      res.json(models.tasks.filterList(list));
    })
    .catch(() => {
      libs.utils.badImplementation(res, 'Error on try to list tasks');
    });
  }
};
