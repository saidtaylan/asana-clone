const express = require("express");
const router = express.Router();
const {
  list,
  create,
  update,
  deleteProject,
} = require("../controllers/Projects.js");
const { validate, authenticate } = require("../middlewares");
const schemas = require("../validations");

router.route("/").get(authenticate, list);
router
  .route("/")
  .post(authenticate, validate(schemas.projects.createValidation), create);
router
  .route("/:id")
  .patch(authenticate, validate(schemas.projects.updateValidation), update);
router
  .route("/:id")
  .delete(
    authenticate,
    validate(schemas.projects.deleteValidation),
    deleteProject
  );

module.exports = {
  router,
};
