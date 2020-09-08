const express = require("express");
const router = express.Router();
const { uploadImage, getAllImage } = require("./file.controller.js");

router.route("/upload")
  .post(uploadImage)
  .get(getAllImage);

module.exports = router;