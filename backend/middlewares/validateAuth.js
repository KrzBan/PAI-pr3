const jwt = require('jsonwebtoken');

const config = require('../config');

const checkIfAuthenticated = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

  if (!token)
    return res.status(401).json({
      mensaje: 'No token provided',
      status: 401,
    });


    jwt.verify(token, config.API_KEY_JWT, (err, decoded) => {
      if (err)
        return res.status(401).json({ mensaje: 'Invalid token', status: 401 });
      req.user = decoded;
      next();
  });
};

const attachAuthInfo = async (req, res, next) => {
  const token =
    req.headers.authorization && req.headers.authorization.split(' ')[1];

    jwt.verify(token, config.API_KEY_JWT, (err, decoded) => {
      if (!err)
        req.user = decoded;
      next();
  });
};


const checkIfAdmin = async (req, res, next) => {
  const role = req.user.role;

  if (role !== 'admin')
    return res.status(401).json({
      mensaje: 'User must have a role of admin',
      status: 401,
    });

    next();
};

module.exports = { checkIfAuthenticated, checkIfAdmin, attachAuthInfo };
