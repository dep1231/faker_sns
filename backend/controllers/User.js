const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;

  const cryptPassword = await bcrypt.hash(password, 12);
  try {
    const newUser = await new User({
      username: username,
      email: email,
      password: cryptPassword,
    });
    const user = await newUser.save();
    const generateToken = (id) => {
      return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "30d",
      });
    };

    res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
      picture: user.picture,
      cover: user.cover,
      followers: user.followers,
      followings: user.followings,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "30d",
    });
  };
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "ユーザーが存在しません" });
    }
    const check = await bcrypt.compare(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: "パスワードが違います",
      });
    }
    return res.status(200).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profile: user.profile,
      picture: user.picture,
      cover: user.cover,
      followers: user.followers,
      followings: user.followings,
      token: generateToken(user._id),
    });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// update

exports.update = async (req, res) => {
  const { userId } = req.body;
  try {
    const check = userId === req.params.id;
    if (!check) {
      return res.status(400).json("IDが一致しない為。更新ができません");
    }
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// delete

exports.del = async (req, res) => {
  const { userId } = req.body;
  try {
    const check = userId === req.params.id;
    if (!check) {
      return res.status(400).json("IDが一致しない為。削除ができません");
    }
    const user = await User.findByIdAndRemove(req.params.id);
    return res.status(200).json("ユーザーが削除されました");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// show

exports.show = async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  try {
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// フォロー

exports.follow = async (req, res) => {
  if (req.body.userId === req.params.id) {
    return res.status(400).json("自分自身にはフォローできません");
  }
  try {
    const currentUser = await User.findById(req.body.userId);
    const user = await User.findById(req.params.id);
    if (
      !currentUser.followers.includes(user._id) &&
      !user.followings.includes(currentUser._id)
    ) {
      await currentUser.updateOne({
        $push: { followers: user._id },
      });

      await user.updateOne({
        $push: { followings: currentUser._id },
      });
      return res.status(200).json("フォローしました");
    } else {
      return res.status(400).json("すでにフォローしています");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// フォロー解除

exports.unfollow = async (req, res) => {
  if (req.body.userId === req.params.id) {
    return res.status(400).json("自分自身にはフォロー解除できません");
  }
  try {
    const currentUser = await User.findById(req.body.userId);
    const user = await User.findById(req.params.id);
    if (
      currentUser.followers.includes(user._id) &&
      user.followings.includes(currentUser._id)
    ) {
      await currentUser.updateOne({
        $pull: { followers: user._id },
      });

      await user.updateOne({
        $pull: { followings: currentUser._id },
      });
      return res.status(200).json("フォロー解除しました");
    } else {
      return res.status(400).json("フォローしていません");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// フォローしてる人の一覧
exports.getFollowersUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("followers")
      .populate("followers", "username picture desc");
    return res.status(200).json({
      followers: user.followers,
    });
  } catch (error) {}
};

// フォローされてる人の一覧
exports.getFollowingsUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .select("followings")
      .populate("followings", "username picture desc");
    return res.status(200).json({
      followings: user.followings,
    });
  } catch (error) {}
};
