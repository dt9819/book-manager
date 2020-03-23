'use strict';
module.exports = (sequelize, DataTypes) => {
  const books = sequelize.define('books', {
    name: {type: DataTypes.STRING},
    author_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
  }, {
    freezeTableName: true,
    defaultPrimaryKey: true,
    timestamps: true, underscored: true,
    tableName: 'books',
  });

  books.associate = (models) => {
    books.belongsTo(models.authors,
        {
          foreignKey: 'author_id',
          as: 'author',
          onDelete: 'cascade',
          onUpdate: 'cascade',
        });
  };

  return books;
};
