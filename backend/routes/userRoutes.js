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

router.patch(
  "/updateMe",
  authController.protect,
  userController.uploadUserPhoto,
  userController.resizeUserPhoto,
  userController.updateMe
);

router
  .route("/:id")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getUserById
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    userController.deleteUserByAdmin
  );

router
  .route("/")
  .get(
    authController.protect,
    authController.restrictTo("admin"),
    userController.getAllUsers
  );

module.exports = router;
