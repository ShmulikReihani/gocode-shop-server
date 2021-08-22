const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.registration = async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;
  console.log(req.body);

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  const user = User({
    firstName: firstName,
    lastName: lastName,
    email: email,
    password: hashPassword,
  });

  try {
    const userExist = await User.exists({ email: user.email });
    if (userExist)
      return res.status(400).json({ status: 400, message: "Email exists" });
    const newUser = await user.save();
    return res.status(200).json({
      status: 200,
      data: newUser,
      message: "Succesfully create new user",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.authentication = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  try {
    const user = await User.findOne({ email: email });
    if (user) {
      const validPass = await bcrypt.compare(password, user.password);
      if (!validPass)
        return res
          .status(400)
          .json({ status: 400, message: "Mobile/Email or Password is wrong" });
      const accessToken = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
        expiresIn: "15d",
      });
      return res
        .status(200)
        .cookie("access-token", accessToken, { httpOnly: true })
        .json({
          status: 200,
          data: { accesToken: accessToken, user: user },
          message: "Succesfully login",
        });
    }
    return res.status(400).json({ status: 400, message: "User not found" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    return res.status(200).json({
      status: 200,
      data: users,
      message: "Succesfully users retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    const user = await User.findById(id);
    return res.status(200).json({
      status: 200,
      data: user,
      message: "Succesfully user retrieved",
    });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
