const status = require('../src/health/routes');
const users = require('../src/users/routes');
const books = require('../src/books/routes');
// const validateAuth = require('../middlewares/validateAuth');
// const getData = require('../middlewares/getData');

require('../src/users_books/models/index').init();

module.exports = (app) => {
  app.use('/status', status);
  app.use('/users', users);
  app.use('/books', books);
  // app.use('/users', validateAuth.checkIfAuthenticated, getData.getGeoip, users);
  app.use
  app.use('*', (req, res) => {
    res.send('Not found!!!');
  });
};
