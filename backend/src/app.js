import express from "express";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import connectionRequestRouter from "./routes/request.js";
import UserRouter from "./routes/user.js";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  cors({
    origin: [
      "http://16.171.2.113::3000",
      "https://3000-firebase-devinder-1747476670920.cluster-nzwlpk54dvagsxetkvxzbvslyi.cloudworkstations.dev",
    ],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);
app.use("/", UserRouter);

connectDB()
  .then(() => {
    console.log("Successfully connected to MongoDB ✅");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("DB cannot be connected!!", err);
  });
