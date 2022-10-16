const Product = require("../models/productModel");
const APIFeatures = require("../utils/apiFeatures");
const catchasync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const imageSchema = require("../models/imageModel");

exports.getAllProducts = catchasync(async (req, res, next) => {
  const features = new APIFeatures(Product.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  let pages = 1;

  if (req.query.limit) {
    const pageSize = parseInt(req.query.limit);
    let count;

    // console.log(req.query);

    if (req.query.name) {
      const keyword = req.query.name;
      count = await Product.countDocuments({ name: { $regex: keyword } });
    } else {
      count = await Product.countDocuments();
    }
    pages = Math.ceil(count / pageSize);
  }

  const products = await features.query;

  if (products.length > 0) {
    res.status(200).json({
      status: "success",
      requestedAt: req.requestTime,
      results: products.length,
      pages,
      data: products,
    });
  } else {
    res.status(404).json({
      status: "fail",
      pages : 0,
      results: 0,
      data: products,
      message: "No Data Found!",
    });
  }
});

exports.getProductById = catchasync(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate("reviews");

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(200).json({ status: "success", data: product });
});

exports.createProduct = catchasync(async (req, res, next) => {
  const product = { ...req.body };

  product.user = req.user.id;

  if (req.body.imageFile) {
    var img = { ...imageSchema };
    img.url = req.body.imageFile;
    img.isExternal = false;
    product.image = img;
  } else if (req.body.image) {
    var img = { ...imageSchema };
    img.url = req.body.image;
    img.isExternal = true;
    product.image = img;
  }

  if (req.body.imagesFiles) {
    var images = [];
    req.body.imagesFiles.forEach((img) => {
      var image = { ...imageSchema };
      image.url = img;
      image.isExternal = false;
      images.push(image);
    });
    product.images = images;
  } else if (req.body.images) {
    var images = [];
    req.body.images.forEach((img) => {
      var image = { ...imageSchema };
      image.url = img;
      image.isExternal = true;
      images.push(image);
    });
    product.images = images;
  }

  const newProduct = await Product.create(product);

  res.status(201).json({
    status: "success",
    data: newProduct,
  });
});

exports.updateProduct = catchasync(async (req, res, next) => {
  var product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  product.name = req.body.name;
  product.description = req.body.description;
  product.price = req.body.price;
  product.category = req.body.category;
  product.brand = req.body.brand;
  product.countInStock = req.body.countInStock;

  if (req.body.imageFile) {
    var img = { ...imageSchema };
    img.url = req.body.imageFile;
    img.isExternal = false;
    product.image = img;
  } else if (req.body.image) {
    var img = { ...imageSchema };
    img.url = req.body.image;
    img.isExternal = true;
    product.image = img;
  }

  if (req.body.imagesFiles) {
    var images = [];
    req.body.imagesFiles.forEach((img) => {
      var image = { ...imageSchema };
      image.url = img;
      image.isExternal = false;
      images.push(image);
    });

    //add images  to product images
    if (product.images) {
      console.log("found images");
      product.images = product.images.concat(images);
    } else {
      console.log("no images");
      product.images = images;
    }
  } else if (req.body.images) {
    var images = [];
    req.body.images.forEach((img) => {
      var image = { ...imageSchema };
      image.url = img;
      image.isExternal = true;
      images.push(image);
    });

    if (product.images) {
      console.log("found images");
      product.images = product.images.concat(images);
    } else {
      console.log("no images");
      product.images = images;
    }
  }

  // console.log(product);

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    product,
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(200).json({
    status: "success",
    data: updatedProduct,
  });
});

exports.deleteProduct = catchasync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError("No product found with that ID", 404));
  }

  res.status(204).json({ status: "success", data: null });
});
