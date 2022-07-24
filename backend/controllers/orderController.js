const Order = require("../models/orderModel");
const APIFeatures = require("../utils/apiFeatures");
const catchasync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllOrders = catchasync(async (req, res, next) => {});

exports.getOrderById = catchasync(async (req, res, next) => {});

exports.createOrder = catchasync(async (req, res, next) => {
  const {
    orderItems,
    shippingAdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    return next(new AppError("No order items found", 400));
  }

  const order = new Order({
    orderItems,
    shippingAdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  const newOrder = await order.save();

  res.status(201).json({
    status: "success",
    data: newOrder,
  });
});
