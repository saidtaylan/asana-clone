const joi = require("joi");

const createValidation = joi.object({
  body: {
    full_name: joi.string().min(2).required(),
    password: joi.string().min(2).required(),
    email: joi.string().email().min(6).required(),
  },
  params: {}
});

const loginValidation = joi.object({
  body: {
    email: joi.string().email().min(6).required(),
    password: joi.string().min(8).required(),
  },
  params: {}
});
const updateValidation = joi.object({
  body: {
    full_name: joi.string().min(8),
    email: joi.string().email().min(6),
    password: joi.string().min(8),
  },
  params: {}
});
const resetPasswordValidation = joi.object({
  body: {
    email: joi.string().email().min(6).required(),
  },
  params: {}
});
module.exports = {
  createValidation,
  loginValidation,
  resetPasswordValidation,
  updateValidation,
};
