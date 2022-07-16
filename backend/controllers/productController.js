const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const catchasync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

exports.getProducts = catchasync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const products = await features.query;

  if (products.length > 0) {
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: products.length,
      data: {
        products,
      },
    });
  } else {
    res.status(404).json({
      status: "fail",
      results: 0,
      data: {
        products,
      },
      message: "No Data Found!",
    });
  }
});

exports.getProductById = catchasync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: { product } });
});
