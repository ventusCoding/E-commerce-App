const User = require('../models/userModel');
const multer = require('multer');
const sharp = require('sharp');
const APIFeatures = require('../utils/apiFeatures');
const AppError = require('../utils/appError');
const catchasync = require('../utils/catchAsync');
const { uuid } = require('uuidv4');
const crypto = require('crypto');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new AppError('Not an image! Please upload only images', 400), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single('photo');

exports.resizeUserPhoto = catchasync(async (req, res, next) => {
  if (!req.file) return next();

  if (req.user) {
    req.file.filename = `user-${req.user.name}-${
      req.user.id
    }-${Date.now()}.jpeg`;
  } else {
    req.file.filename = `user-${uuid()}-${Date.now()}.jpeg`;
  }

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 90 })
    .toFile(`backend/public/img/users/${req.file.filename}`);

  next();
});