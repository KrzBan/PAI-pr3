const users = require('../src/users/routes');
const books = require('../src/books/routes');

require('../src/users_books/models/index').init();

module.exports = (app) => {
  app.use('/users', users);
  app.use('/books', books);
  app.use
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
