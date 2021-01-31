const { celebrate, Joi } = require('celebrate');

const validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports = { validateId };
