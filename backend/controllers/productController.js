const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const catchasync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllProducts = catchasync(async (req, res, next) => {
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
      data: products,
    });
  } else {
    res.status(404).json({
      status: "fail",
      results: 0,
      data: products,
      message: "No Data Found!",
    });
  }
});

exports.getProductById = catchasync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: product });
});

exports.createProduct = catchasync(async (req, res, next) => {
  const product = req.body;

  product.user = req.user.id;

  newProduct = await Product.create(product);

  res.status(201).json({ status: "success", data: newProduct });
});

exports.updateProduct = catchasync(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: product });
});

exports.deleteProduct = catchasync(async (req, res, next) => {
  console.log("aadelte  product");
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
