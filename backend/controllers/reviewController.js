const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Product = require("../models/productModel");

exports.getAllReviews = catchAsync(async (req, res, next) => {
  const reviews = await Review.find();

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: reviews,
  });
});

exports.createReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.body.product);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  const newReview = req.body;

  newReview.user = req.user.id;

  const createdReview = await Review.create(newReview);

  const reviews = await Review.find({ product: req.body.product });

  const averageRating = await Review.aggregate([
    {
      $match: { product: product._id },
    },
    {
      $group: {
        _id: "$product",
        averageRating: { $avg: "$rating" },
      },
    },
  ]);

  const averageRatingValue = averageRating[0].averageRating;

  product.numReviews = reviews.length;
  product.ratingsAverage = averageRatingValue.toFixed(1);
  console.log(averageRating);

  await product.save();

  res.status(201).json({
    status: "success",
    data: createdReview,
  });
});
