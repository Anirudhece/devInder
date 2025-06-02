import express from "express";
import { connectDB } from "./config/database.js";
import cookieParser from "cookie-parser";
import authRouter from "./routes/auth.js";
import profileRouter from "./routes/profile.js";
import connectionRequestRouter from "./routes/request.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", connectionRequestRouter);

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
