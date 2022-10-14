const express = require('express');
const authController = require('./../../controllers/authController');
const videoController = require('./../../controllers/videoController');
const {
  youtubeLinkUploadRules,
} = require('./../../validations/rules/video.rules');
const { validateInputFields } = require('./../../validations/validate');

const router = express.Router();

router
  .route('/')
  .post(
    youtubeLinkUploadRules(),
    validateInputFields,
    authController.protect,
    videoController.setUploaderUser,
    videoController.create
  )
  .get(videoController.getList);

router.use(authController.protect);

router.get('/by-user', videoController.getListByUser);
router.route('/:id').get(videoController.getOne);

router
  .route('/:id')
  .patch(videoController.updateOne)
  .delete(videoController.deleteOne)
  .patch(videoController.likeVideo)
  .patch(videoController.dislikeVideo);

module.exports = router;
