const express = require("express");
const {
  post,
  show,
  showFind,
  update,
  deletePost,
  allPosts,
  like,
  unlike,
  comment,
} = require("../controllers/Post");
const { protect } = require("../middlewere/authMiddlewere");
const router = express.Router();

router.post("/", protect, post);
router.put("/:id", protect, update);
router.delete("/:id", protect, deletePost);
router.get("/profile/:id", show);
router.get("/post/:id", showFind);
router.get("/all", allPosts);
router.put("/like/:id", protect, like);
router.put("/unlike/:id", protect, unlike);
router.post("/comment", protect, comment);

module.exports = router;
