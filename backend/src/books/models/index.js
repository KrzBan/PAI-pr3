const sequelize = require('../../../services/database');
const { DataTypes } = require('sequelize');

const Book = sequelize.define('Book', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false
  },
  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
}, {
  
});

/*await*/ Book.sync();

module.exports = {
    Book,
};
