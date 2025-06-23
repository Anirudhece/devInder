import express from "express";
import { userAuth } from "../middlewares/auth.js";
import { validateProfileEditData } from "../utils/validation.js";
import bcrypt from "bcrypt";
import validator from "validator";
import { SAFE_DATA } from "../utils/constants.js";

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

    SAFE_DATA.forEach((key) => {
      if (req.body[key] !== undefined) {
        logedInUser[key] = req.body[key];
      }
    });

    await logedInUser.save();
    res.status(200).send(logedInUser);
  } catch (error) {
    console.log(`error happened inside profiles 🔴:`, error);
    res.status(500).send("unable to update the userProfile");
  }
});

profileRouter.patch("/profile/change-password", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).send("New password is required.");
    }

    const isSamePassword = await bcrypt.compare(
      newPassword,
      loggedInUser.password
    );
    if (isSamePassword) {
      return res
        .status(400)
        .send("New password cannot be the same as the old password.");
    }

    if (!validator.isStrongPassword(newPassword)) {
      return res.status(400).send("New password should be strong.");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    loggedInUser.password = hashedPassword;
    await loggedInUser.save();

    res.status(200).send('password changed successfully');

  } catch (error) {
    console.error(`Error in /profile/change-password:`, error);
    res.status(500).send("Unable to change password.");
  }
});

export default profileRouter;
