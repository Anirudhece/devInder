import express from "express";
import { connectDB } from "./config/database.js";
const app = express();
import User from "./models/User.js";
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
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

app.get("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    const isValidEmail = validator.isEmail(email);
    if (!isValidEmail) {
      throw new Error('Invalid Credentials.');
    }
    if (!password) {
      throw new Error('Password is missing.');
    }

    const user = await User.findOne({ email });
    if(!user){
      throw new Error('User not found.');
    }

    const isPasswordValid = await bcrypt.compare(password, user?.password);
    if (!isPasswordValid) {
      throw new Error('Invalid Credentials.');
    }

    const token = jwt.sign({ _id: user._id }, 'Learning@Anii69');

    res.status(200).cookie("token", token).send("User logged in successfully");

  } catch (error) {
    res
      .status(400)
      .send({ err: "something went wrong while signing uo", msg: error });
  }
});

connectDB()
  .then(() => {
    console.log("Successfully connected to MongoDB ✅");

    const PORT = 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB cannot be connected!!", err);
  });
