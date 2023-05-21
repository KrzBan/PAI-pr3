const express = require('express');

const controller = require('./controller/index');
const validateAuth = require('../../middlewares/validateAuth');
const validateSchemas = require('../../middlewares/validateSchemas');
const schemas = require('./utils/schemasValidation');

const router = express.Router();

router.get('/', 
    validateAuth.attachAuthInfo,
    (req, res) => {
      controller.getAll(res, {}, req);
    });

router.get('/:id', 
    validateAuth.attachAuthInfo,
    (req, res) => {
      controller.get(res, {}, req);
    });
  
router.post(
    '/',
    validateAuth.checkIfAuthenticated,
    validateAuth.checkIfAdmin,
    validateSchemas.inputs(schemas.book, 'body'),
    (req, res) => {
      controller.create(res, req.body, {});
    }
);

router.put(
    '/:id',
    validateAuth.checkIfAuthenticated,
    validateAuth.checkIfAdmin,
    validateSchemas.inputs(schemas.bookUpdate, 'body'),
    (req, res) => {
      controller.update(res, req.body, req);
    }
);

router.delete(
    '/:id',
    validateAuth.checkIfAuthenticated,
    validateAuth.checkIfAdmin,
    (req, res) => {
      controller.delete(res, {}, req);
    }
);

router.post(
    '/:id/claim',
    validateAuth.checkIfAuthenticated,
    (req, res) => {
      controller.claim(res, {}, req);
    }
);

router.post(
    '/:id/return',
    validateAuth.checkIfAuthenticated,
    (req, res) => {
      controller.return(res, {}, req);
    }
);

module.exports = router;
