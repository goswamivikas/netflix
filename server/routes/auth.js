const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

//REGISTER
router.post("/register", async (req, res) => {
  console.log("in register function");
  const newUser = new User({
    username: req.body.email,
    email: req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY
    ).toString(),
  });

  try {
    const { _id, username, email, profilePic } = await newUser.save();
    const accessToken = jwt.sign({ id: _id, email }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });
    res.status(201).json({ _id, username, email, profilePic, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  console.log({ "req-body": req.body });
  try {
    const user = await User.findOne({ email: req.body.email });
    !user && res.status(401).json("user doesn't exist");

    console.log({ user });

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8);

    originalPassword !== req.body.password &&
      res.status(401).json("wrong password or username");

    const { _id, username, email, profilePic } = user._doc;

    const accessToken = jwt.sign(
      { id: user._id, email },
      process.env.SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({ _id, username, email, profilePic, accessToken });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
