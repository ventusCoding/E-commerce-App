const AppError = require("../utils/appError");
const catchasync = require("../utils/catchAsync");
const multer = require("multer");
const sharp = require("sharp");
const { v4: uuidv4 } = require("uuid");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError("Not an image! Please upload only images", 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadImage = (type) => {
  return upload.single(type);
};

exports.resizeImage = (type) => {
  return catchasync(async (req, res, next) => {
    if (!req.file) return next();

    req.file.filename = `${type}-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.file.buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`backend/public/img/${type}/${req.file.filename}`);

    next();
  });
};

//************************************/

exports.uploadProductImages = upload.fields([
  { name: "image", maxCount: 1 },
  { name: "images", maxCount: 10 },
]);

exports.resizeProductImages = catchasync(async (req, res, next) => {
  // 1)  image
  if (req.files.image) {
    req.body.imageFile = `product-${uuidv4()}-${Date.now()}.jpeg`;

    await sharp(req.files.image[0].buffer)
      .resize(500, 500)
      .toFormat("jpeg")
      .jpeg({ quality: 90 })
      .toFile(`backend/public/img/products/${req.body.imageFile}`);
  }
  // 2) Images
  if (req.files.images) {
    req.body.imagesFiles = [];

    await Promise.all(
      req.files.images.map(async (file, i) => {
        const filename = `product-${uuidv4()}-${Date.now()}.jpeg`;

        await sharp(file.buffer)
          .resize(500, 500)
          .toFormat("jpeg")
          .jpeg({ quality: 90 })
          .toFile(`backend/public/img/products/${filename}`);

        req.body.imagesFiles.push(filename);
      })
    );
  }

  next();
});
