const express = require("express");
const authController = require("../controllers/authController");

const orderController = require("../controllers/orderController");

const router = express.Router();

router
  .route("/:id/deliver")
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    orderController.updateOrderToDeliver
  );

router
  .route("/")
  .get(authController.protect, authController.restrictTo("admin"), orderController.getAllOrders)
  .post(authController.protect, orderController.createOrder);

router
  .route("/myorders")
  .get(authController.protect, orderController.getUserOrders);

router.route("/:id").get(authController.protect, orderController.getOrderById);
router
  .route("/:id/pay")
  .patch(authController.protect, orderController.updateOrderToPaid);

module.exports = router;
