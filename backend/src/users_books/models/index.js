const sequelize = require('../../../services/database');

const {User} = require("../../users/models/index");
const {Book} = require("../../books/models/index");

module.exports.init = async ()=>{
    User.belongsToMany(Book, { through: 'UsersBooks'});
    Book.belongsToMany(User, { through: 'UsersBooks'});

    await sequelize.sync();
}
