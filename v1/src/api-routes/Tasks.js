const express = require("express");
const router = express.Router();
const { list, create, update, deleteTask, addComment, deleteComment, addSubTask } = require("../controllers/Tasks.js");
const { validate, authenticate } = require("../middlewares");
const schemas = require("../validations");

router.route("/:section_id").get(authenticate, validate(schemas.tasks.listValidation), list);
router.route("/:section_id").post(authenticate, validate(schemas.tasks.createValidation), create);
router.route("/:id").patch(authenticate, validate(schemas.tasks.updateValidation), update);
router.route("/:id").delete(authenticate, validate(schemas.tasks.deleteValidation), deleteTask);

router.route("/:id/add-comment").post(authenticate, validate(schemas.tasks.addCommentValidation), addComment);
router.route("/:id/:comment_id").delete(authenticate, validate(schemas.tasks.deleteCommentValidation), deleteComment);

router.route("/:id/subtask").post(authenticate, validate(schemas.tasks.addSubTaskValidation), addSubTask);
module.exports = {
  router,
};
