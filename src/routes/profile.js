import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateProfileEditData } from "../utils/validation.js";

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (error) {
    console.log(`error happened inside profiles :`, error);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    const validation = await validateProfileEditData(req);
    if (!validation.success) {
      res.status(400).send(validation.errors);
      return;
    }

    const logedInUser = req.user;

    Object.keys(req.body).forEach((key) => {
      logedInUser[key] = req.body[key];
    });

    await logedInUser.save();
    res.status(200).send(logedInUser);

  } catch (error) {
    console.log(`error happened inside profiles 🔴:`, error);
    res.status(500).send('unable to update the userProfile');
  }
});

export default profileRouter;
