const express = require("express");
const { uploadImage } = require("../controllers/Upload");
const { protect } = require("../middlewere/authMiddlewere");
const imageUpload = require("../middlewere/imageUpload");
const router = express.Router();

router.post("/uploadImage", imageUpload, uploadImage);

module.exports = router;
