import express from "express";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, email, password, age, gender } = req.body;
    const isStrongPassword = validator.isStrongPassword(password);
    if (!isStrongPassword) {
      return res.status(400).json({ error: "Password is not strong enough" });
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      age,
      gender,
    });

    await user.save();

    res.status(200).send("User created successfully");
  } catch (error) {
    res.status(400).send({ err: "User cannot be created", msg: error });
  }
});

authRouter.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      throw new Error("Invalid Credentials.");
    }
    if (!password) {
      throw new Error("Password is missing.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found.");
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new Error("Invalid Credentials.");
    }

    const token = jwt.sign({ _id: user._id }, "Learning@Anii69");

    res
      .status(200)
      .cookie("token", token)
      .send({ msg: "User logged in successfully", user });
  } catch (error) {
    res
      .status(400)
      .send({
        err: "something went wrong while signing in.",
        msg: error.message,
      });
  }
});

authRouter.post("/logout", async (req, res) => {
  try {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
    });
    res.status(200).send("User logged out successfully");
  } catch (error) {
    console.log("error in logout ", error);
  }
});

export default authRouter;
