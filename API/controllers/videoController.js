const Video = require('./../models/video.model');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');
const crudFactory = require('./../controllers/handleCRUDFactory');
const httpStatus = require('http-status');

exports.setUploaderUser = catchAsync(async (req, res, next) => {
  req.body.uploadedBy = req.user;

  next();
});

// middleware to check if video is uploaded by user (update/delete)
exports.checkIsVideoUploadedByUser = catchAsync(async (req, res, next) => {
  const video = await Video.findById(req.params.id);
  if (!video)
    return new AppError(
      'Video with provided id not found',
      httpStatus.NOT_FOUND
    );

  if (video.uploadedBy !== req.user._id)
    return new AppError(
      'You are not allowed to edit/delete this particular video',
      httpStatus.UNAUTHORIZED
    );

  next();
});

exports.create = crudFactory.createOne(Video);
exports.getList = crudFactory.getAll(Video);
exports.updateOne = crudFactory.updateOne(Video);
exports.deleteOne = crudFactory.deleteOne(Video);
exports.getOne = crudFactory.getOne(Video);
exports.likeVideo = catchAsync(async (req, res, next) => {});
exports.dislikeVideo = catchAsync(async (req, res, next) => {});
exports.getListByUser = crudFactory.getAll(Video, { uploadedBy: undefined });
