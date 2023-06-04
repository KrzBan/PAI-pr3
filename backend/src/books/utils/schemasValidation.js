const Joi = require('@hapi/joi');

const schemas = {
  book: Joi.object().keys({
    name: Joi.string().required(),
    author: Joi.string().required(),
    isbn: Joi.string().required(),
    count: Joi.number().min(0).required(),
  }),
  bookUpdate: Joi.object().keys({
    name: Joi.string(),
    author: Joi.string(),
    isbn: Joi.string(),
    count: Joi.number().min(0),
  })
};

module.exports = schemas;
