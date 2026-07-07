const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");
const validate = require("../middlewares/validate.middleware");
const { registerSchema, loginSchema } = require("../validators/auth.validator");
const authenticate = require("../middlewares/auth.middleware");

router.post("/register", validate(registerSchema), authController.register);
router.post("/login", validate(loginSchema), authController.login);
router.get("/profile", authenticate, authController.profile);
router.post("/logout", authController.logout);
router.get("/me", authenticate, authController.getMe);
module.exports = router;
