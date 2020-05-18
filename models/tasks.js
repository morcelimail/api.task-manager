'use strict';

const _ = require('lodash');

module.exports = (sequelize, DataTypes) => {
  const model = sequelize.define('tasks', {
    title: {
      type: DataTypes.STRING(256),
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(1024),
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM([
        'pending',
        'inProgress',
        'done',
        'deleted'
      ]),
      allowNull: false,
      defaultValue: 'pending'
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null
    }
  });

  model.associate = (models) => {};

  model.filter = registry => {
    return _.pick(registry, [
      'id',
      'title',
      'description',
      'status'
    ]);
  };

  model.filterList = (list) => {
    return (list || []).map(model.filter);
  }

  return model;
};
