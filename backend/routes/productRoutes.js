const express = require("express");

const productController = require("../controllers/productController");
const authController = require("../controllers/authController");
const uploadController = require('../controllers/uploadController');

const router = express.Router();

router
  .route("/")
  .get(productController.getAllProducts)
  .post(
    authController.protect,
    authController.restrictTo("admin"),
    uploadController.uploadProductImages,
    uploadController.resizeProductImages,
    productController.createProduct
  );

router
  .route("/:id")
  .get(productController.getProductById)
  .patch(
    authController.protect,
    authController.restrictTo("admin"),
    uploadController.uploadProductImages,
    uploadController.resizeProductImages,
    productController.updateProduct
  )
  .delete(
    authController.protect,
    authController.restrictTo("admin"),
    productController.deleteProduct
  );

module.exports = router;
