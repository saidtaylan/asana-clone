const express = require("express");
const router = express.Router();
const { create, list, login, resetPassword, update, profileImageUpload } = require("../controllers/Users.js");
const projectService = require("../controllers/Projects.js")
const validate = require("../middlewares/validate.js");
const schemas = require("../validations");
const authenticate = require("../middlewares/authenticate.js");

router.route("/").get(authenticate, list);
router.route("/").post(validate(schemas.users.createValidation), create);
router.route("/login").post(validate(schemas.users.loginValidation), login)
router.route("/projects").get(authenticate, projectService.list )
router.route("/reset-password").post(validate(schemas.users.resetPasswordValidation), resetPassword)
router.route("/update").patch(authenticate, validate(schemas.users.updateValidation), update)
//router.route("/delete").delete(authenticate, deleteUser)
router.route("/image-upload").post(authenticate, profileImageUpload)

module.exports = {
  router,
};
