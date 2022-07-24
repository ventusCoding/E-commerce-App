const Order = require("../models/orderModel");
const APIFeatures = require("../utils/apiFeatures");
const catchasync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getAllOrders = catchasync(async (req, res, next) => {
  const features = new APIFeatures(Order.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query;

  if (orders.length > 0) {
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: orders.length,
      data: orders,
    });
  } else {
    res.status(404).json({
      status: "fail",
      results: 0,
      data: orders,
      message: "No Data Found!",
    });
  }
});

exports.getOrderById = catchasync(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
    
    if (!order) {
        return next(new AppError("No order found with that ID", 404));
    }
    
    res.status(200).json({ status: "success", data: order });
});

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
