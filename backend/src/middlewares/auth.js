import jwt from "jsonwebtoken";
import User from "../models/User.js"

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("token not found.");
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    const { _id } = decoded;
    if (!_id) {
      throw new Error("Unautherised");
    }

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found.");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send(`Unautherised: ${error.message}`);
  }
};
export {userAuth};
