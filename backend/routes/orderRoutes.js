const express = require("express");
const authController = require("../controllers/authController");

const orderController = require("../controllers/orderController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, orderController.getAllOrders)
  .post(authController.protect, orderController.createOrder);

router.route("/:id").get(authController.protect, orderController.getOrderById);

module.exports = router;
