'use strict';

module.exports = (sequelize, DataTypes) => {
  const authors = sequelize.define('authors', {
    full_name: {type: DataTypes.STRING},
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
    },
  }, {
    freezeTableName: true,
    defaultPrimaryKey: true,
    timestamps: true, underscored: true,
    tableName: 'authors',
  });

  return authors;
};
