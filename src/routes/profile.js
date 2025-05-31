import express from "express";
import { userAuth } from "../middlewares/auth.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(`error happened inside profiles :`, error);
  }
});
