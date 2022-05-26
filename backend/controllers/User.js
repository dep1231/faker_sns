const User = require("../models/User");

// register
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const newUser = await new User({
      username: username,
      email: email,
      password: password,
    });
    const user = await newUser.save();
    res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

// login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json("メールアドレスが存在しません");
    }
    const validationPassword = password === user.password;
    if (!validationPassword) {
      return res.status(400).json("パスワードが違います");
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};
