const joi = require("joi");

const createValidation = joi.object({
  body: {
    name: joi.string().min(5).required(),
  },
});
const updateValidation = joi.object({
  params: {
    id: joi.string().min(5).required(),
  },
});
const deleteValidation = joi.object({
  params: {
    id: joi.string().min(5).required(),
  },
});

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
};
