const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: [true, "A Product must Have a name"],
    },
    image: {
      url: {
        type: String,
        default: "no-image.png",
      },
      isExternal: {
        type: Boolean,
        default: false,
      },
    },
    images: [
      {
        url: {
          type: String,
        },
        isExternal: {
          type: Boolean,
          default: false,
        },
      },
    ],

    brand: {
      type: String,
      required: [true, "A Product must Have a brand"],
    },
    category: {
      type: String,
      required: [true, "A Product must Have a category"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "A Product must Have a description"],
      maxlength: [500, "Description cannot be more than 500 characters"],
      minlength: [10, "Description cannot be less than 10 characters"],
    },
    rating: {
      type: Number,
      required: [true, "A Product must Have a rating"],
      default: 0,
    },
    numReviews: {
      type: Number,
      required: [true, "A Product must Have a count in number of reviews"],
      default: 0,
    },
    price: {
      type: Number,
      required: [true, "A Product must Have a price"],
    },
    countInStock: {
      type: Number,
      required: [true, "A Product must Have a count in stock"],
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
