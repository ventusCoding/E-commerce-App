const mongoose = require("mongoose");
const imageSchema = require("./imageModel");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true },
        image: { type: imageSchema, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
      },
    ],
    itemsPrice: {
      type: Number,
      required: [true, "An order must have a items price"],
      default: 0,
    },
    shippingAdress: {
      address: {
        type: String,
        required: [true, "An order must Have a shipping address"],
      },
      city: {
        type: String,
        required: [true, "An order must Have a shipping city"],
      },
      postalCode: {
        type: String,
        required: [true, "An order must Have a shipping postal code"],
      },
      country: {
        type: String,
        required: [true, "An order must Have a shipping country"],
      },
    },
    paymentMethod: {
      type: String,
      required: [true, "An order must Have a payment method"],
    },
    paymentResult: {
      id: { type: String },
      status: { type: String },
      update_time: { type: String },
      email_address: { type: String },
    },
    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
