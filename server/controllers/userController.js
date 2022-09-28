const Users = require("../models/userModel");
const bcrypt = require("bcrypt");

module.exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    //check data is present or not
    const user = await Users.findOne({ username });
    if (!user)
      return res.json({ msg: "Username does not exist", status: false });

    //check password
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck)
      return res.json({ msg: "Incorrect Password", status: false });

    //delete password from database
    delete user.password;
    res.json({ status: true, user });
  } catch (ex) {
    next(ex);
  }
};

module.exports.register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    //check data is present or not
    const userCheck = await Users.findOne({ username });
    if (userCheck)
      return res.json({ msg: "Username Already Used", status: false });

    const emailCheck = await Users.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email Already Used", status: false });

    //bcrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create new user
    const newUser = await Users.create({
      username,
      email,
      password: hashedPassword,
    });

    //delete password from database
    await delete newUser.password;

    res.json({ status: true, newUser });
  } catch (ex) {
    next(ex);
  }
};

module.exports.setAvatar = async (req, res, next) => {
  const userId = req.params.id;
  const Avatar = req.body.avatar;
  try {
    const user = await Users.findByIdAndUpdate(
      userId,
      {
        isAvatar: true,
        Avatar,
      },
      { new: true }
    );

    res.json({ isAvatar: user.isAvatar, Avatar: user.Avatar });
  } catch (ex) {
    next(ex);
  }
};

module.exports.getAllUser = async (req, res, next) => {
  try {
    const user = await Users.find({ _id: { $ne: req.params.id } }).select([
      "username",
      "email",
      "Avatar",
      "_id",
    ]);

    res.json(user);
  } catch (ex) {
    next(ex);
  }
};
