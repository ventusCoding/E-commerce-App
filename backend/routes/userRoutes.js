const express = require("express");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

const router = express.Router();

router.post(
  "/signup",
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  authController.signup
);
router.post("/login", authController.login);

router.post("/forgotPassword", authController.forgotPassword);
router.patch("/resetPassword/:token", authController.resetPassword);
router.patch("/emailVerification/:token", authController.verifyEmail);
router.post("/resendVerificationEmail", authController.resendVerificationEmail);

router.patch(
  "/updateMyPassword",
  authController.protect,
  authController.updatePassword
);

module.exports = router;
