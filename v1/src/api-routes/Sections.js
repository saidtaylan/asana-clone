const express = require("express");
const router = express.Router();
const {
  list,
  create,
  update,
  deleteSection,
} = require("../controllers/Sections.js");
const { validate, authenticate } = require("../middlewares");
const schemas = require("../validations");

router.route("/:project_id").get(authenticate, validate(schemas.sections.listValidation), list);
router
  .route("/")
  .post(authenticate, validate(schemas.sections.createValidation), create);
router
  .route("/:id")
  .patch(authenticate, validate(schemas.sections.updateValidation), update);
router
  .route("/:id")
  .delete(
    authenticate,
    validate(schemas.sections.deleteValidation),
    deleteSection
  );

module.exports = {
  router,
};
