const express = require("express");

const router = express.Router();

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const User = require("../models/User");

const nodemailer = require("nodemailer");


// REGISTER

router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK USER EXISTS

    const existingUser = await User.findOne({
      email
    });

    if(existingUser){

      return res.status(400).json({
        message: "User already exists"
      });

    }

    // HASH PASSWORD

    const hashedPassword =
      await bcrypt.hash(password, 10);

    // CREATE USER

    const newUser = new User({

      name,
      email,
      password: hashedPassword

    });

    // SAVE USER

    await newUser.save();

    res.status(201).json({
      message: "Registration Successful"
    });

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});


// LOGIN

router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER

    const user = await User.findOne({
      email
    });

    if(!user){

      return res.status(400).json({
        message: "Invalid Email or Password"
      });

    }

    // COMPARE PASSWORD

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if(!isMatch){

      return res.status(400).json({
        message: "Invalid Email or Password"
      });

    }

    // TOKEN

    const token = jwt.sign(

      {
        id: user._id
      },

      process.env.JWT_SECRET,

      {
        expiresIn: "7d"
      }

    );
console.log("USER ROLE:", user.role);
   res.status(200).json({
  message: "Login Successful",
  token,
  role: user.role,
  user: {
    name: user.name,
    email: user.email
  }
});

  }
  catch(error){

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});
router.post("/forgot-password", async (req, res) => {

  try {

    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(404).json({
        message: "User not found"
      });

    }

    const token = jwt.sign(

      { id: user._id },

      process.env.JWT_SECRET,

      { expiresIn: "15m" }

    );

    const transporter = nodemailer.createTransport({

      service: "gmail",

      auth: {

        user: process.env.EMAIL_USER,

        pass: process.env.EMAIL_PASS

      }

    });

    const resetLink =
      `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({

      from: process.env.EMAIL_USER,

      to: email,

      subject: "Password Reset",

      html: `
        <h3>Reset Password</h3>
        <a href="${resetLink}">
          Click Here To Reset Password
        </a>
      `

    });

    res.status(200).json({
      message: "Reset link sent"
    });

  }

  catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error"
    });

  }

});

router.post("/reset-password/:token", async (req, res) => {

  try {

    const { token } = req.params;

    const { password } = req.body;

    const decoded = jwt.verify(

      token,

      process.env.JWT_SECRET

    );

    const hashedPassword =
      await bcrypt.hash(password, 10);

    await User.findByIdAndUpdate(

      decoded.id,

      {
        password: hashedPassword
      }

    );

    res.status(200).json({
      message: "Password Updated"
    });

  }

  catch (error) {

    console.log(error);

    res.status(400).json({
      message: "Invalid or Expired Token"
    });

  }

});

module.exports = router;