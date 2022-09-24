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

exports.getUserOrders = catchasync(async (req, res, next) => {
  const features = new APIFeatures(Order.find({ user: req.user.id }), req.query)
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
  //get order by id and populate user and order items
  const order = await Order.findById(req.params.id).populate(
    "user",
    "name email"
  );

  // console.log(order);

  if (!order) {
    return next(new AppError("No order found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: order });
});

exports.updateOrderToPaid = catchasync(async (req, res, next) => {
  //get order by id and populate user and order items
  const order = await Order.findById(req.params.id);

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    };

    const updatedOrder = await order.save();

    res.status(200).json({ status: "success", data: updatedOrder });
  } else {
    res.status(404);
    throw new Error("Order not found");
  }
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

  // console.log(req.body);

  if (orderItems && orderItems.length === 0) {
    return next(new AppError("No order items found", 400));
  }

  const newOrder = await Order.create({
    orderItems,
    shippingAdress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user._id,
  });

  res.status(201).json({
    status: "success",
    data: newOrder,
  });
});
