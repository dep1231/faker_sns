const Post = require("../models/Post");
const User = require("../models/User");

// 投稿機能
exports.post = async (req, res) => {
  const newPost = new Post(req.body);
  try {
    const savedPost = await newPost.save();
    await savedPost.populate("user", "username picture cover");
    res.status(200).json(savedPost);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// 自分の投稿したデータの取得
exports.show = async (req, res) => {
  try {
    const posts = await Post.find({ user: req.params.id })
      .populate("user", "username picture cover")
      .sort({ createdAt: -1 })
      .limit(10);
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// 特定の投稿を一つ取得

exports.showFind = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("user", "username picture cover")
      .populate("comments.commentBy", "username picture")
      .sort({ createdAt: -1 })
      .limit(10);
    post.comments.sort((a, b) => {
      return b.commentAt - a.commentAt;
    });
    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// 全ての投稿を取得する

exports.allPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("user", "username picture cover")
      .sort({ createdAt: -1 })
      .limit(10);

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// 投稿の更新
exports.update = async (req, res) => {
  try {
    const post = await Post.findById(req.body.id);
    if (!post.userId === req.body.userId) {
      return res.status(401).json({ message: "Not Authorized" });
    }
    await post.updateOne({ $set: req.body });
    return res.status(200).json("アップデート成功");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// 投稿の削除
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    await post.deleteOne();
    return res.status(200).json("削除成功");
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
// いいねをつける
exports.like = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const post = await Post.findById(req.params.id);
    if (!post.likes.includes(user._id)) {
      const postUpdate = await Post.findByIdAndUpdate(
        post._id,
        {
          $push: { likes: user._id },
        },
        { new: true }
      ).populate("user", "username picture cover");
      return res.status(200).json(postUpdate);
    } else {
      return res.status(400).json("すでにいいねしています");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// いいねを取り消す
exports.unlike = async (req, res) => {
  try {
    const user = await User.findById(req.body.userId);
    const post = await Post.findById(req.params.id);
    if (post.likes.includes(user._id)) {
      const postUpdate = await Post.findByIdAndUpdate(
        post._id,
        {
          $pull: { likes: user._id },
        },
        { new: true }
      ).populate("user", "username picture cover");
      return res.status(200).json(postUpdate);
    } else {
      return res.status(400).json("いいねしていません");
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// コメントを投稿する

exports.comment = async (req, res) => {
  try {
    const { comment, img, postId, userId } = req.body;
    const postComment = await Post.findByIdAndUpdate(
      postId,
      {
        $push: {
          comments: {
            comment: comment,
            img: img,
            commentBy: userId,
            commentAt: new Date(),
          },
        },
      },
      { new: true }
    )
      .populate("comments.commentBy", "username picture")
      .populate("user", "username picture");
    postComment.comments.sort((a, b) => {
      return b.commentAt - a.commentAt;
    });
    res.status(200).json(postComment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
