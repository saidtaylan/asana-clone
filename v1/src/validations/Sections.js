const joi = require("joi");

const updateValidation = joi.object({
  params: {
    id: joi.string().min(5).required(),
  },
  body: {
    name: joi.string().min(3),
    project_id: joi.string().min(5),
  },
});
const deleteValidation = joi.object({
  params: {
    id: joi.string().min(5).required(),
  },
  body: {}
});
const listValidation = joi.object({
  params: {
    project_id: joi.string().min(5).required(),
  },
  body: {}
});
const createValidation = joi.object({
  body: {
    name: joi.string().min(3).required(),
    project_id: joi.string().min(5).required(),
  },
  params: {}
});

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
  listValidation,
};
