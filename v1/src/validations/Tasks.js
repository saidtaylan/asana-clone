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
  body: {},
});

const listValidation = joi.object({
  params: {
    section_id: joi.string().min(5).required(),
  },
  body: {},
});

const createValidation = joi.object({
  body: {
    title: joi.string().min(3).required(),
    description: joi.string().min(5).required(),
    assigned_to: joi.string().min(8),
    due_date: joi.date(),
    statuses: joi.array(),
    project_id: joi.string().min(8),
    order: joi.number(),
    is_completed: joi.boolean(),
    comments: joi.array(),
    media: joi.array(),
    sub_tasks: joi.array(),
  },
  params: {
    section_id: joi.string().required().min(8),
  },
});

const addSubTaskValidation = joi.object({
  body: {
    title: joi.string().min(3).required(),
    description: joi.string().min(5).required(),
    assigned_to: joi.string().min(8),
    due_date: joi.date(),
    statuses: joi.array(),
    project_id: joi.string().min(8),
    order: joi.number(),
    is_completed: joi.boolean(),
    comments: joi.array(),
    media: joi.array(),
    sub_tasks: joi.array(),
  },
  params: {
    id: joi.string().required().min(8),
  },
});

const addCommentValidation = joi.object({
  params: {
    id: joi.string().required().min(8),
  },
  body: {
    content: joi.string().required().min(6),
  },
});

const deleteCommentValidation = joi.object({
  params: {
    id: joi.string().required().min(8),
    comment_id: joi.string().required().min(8),
  },
  body: {}
});

module.exports = {
  createValidation,
  updateValidation,
  deleteValidation,
  listValidation,
  addCommentValidation,
  deleteCommentValidation,
  addSubTaskValidation
};
