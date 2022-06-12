const express = require("express");
const {
  register,
  login,
  update,
  del,
  show,
  follow,
  unfollow,
  getFollowersUser,
  getFollowingsUser,
} = require("../controllers/User");
const { protect } = require("../middlewere/authMiddlewere");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.put("/:id", update);
router.delete("/:id", del);
router.get("/:id", show);
router.put("/follow/:id", protect, follow);
router.put("/unfollow/:id", protect, unfollow);
router.get("/followers/:id", getFollowersUser);
router.get("/followings/:id", getFollowingsUser);

module.exports = router;
