import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/ConnectionRequest.js";

const UserRouter = express.Router();
const SAFE_DATA = [
  "firstName",
  "age",
  "lastName",
  "photoUrl",
  "gender",
  "about",
  "skills",
];

//get all the pending connection requests for loggedIn user
UserRouter.get("/user/request/recieved", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;
    const pendingConnectionRequests = await ConnectionRequest.find({
      toUserId: userId,
      status: "interested",
    }).populate("fromUserId", SAFE_DATA);

    res.status(200).send({
      message: "Pending connection requests fetched successfully",
      requests: pendingConnectionRequests,
    });
  } catch (error) {
    res.status(400).send({
      message: "error happened inside connection request",
      error: error.message,
    });
  }
});

UserRouter.get("/user/connection", userAuth, async (req, res) => {
  try {
    const userId = req.user._id;

    const connectionRequests = await ConnectionRequest.find({
      $or: [
        { fromUserId: userId, status: "accepted" },
        { toUserId: userId, status: "accepted" },
      ],
    })
      .populate("fromUserId", SAFE_DATA)
      .populate("toUserId", SAFE_DATA);

    const filteredData = connectionRequests.map((row) => {
      if (row.fromUserId._id.toString() === userId.toString()) {
        return row.toUserId;
      }
      return row.fromUserId;
    });

    res.status(200).send({
      message: "Connection requests fetched successfully",
      requests: filteredData,
    });
  } catch (error) {
    res.status(400).send({
      message: "error happened inside connection request",
      error: error.message,
    });
  }
});

export default UserRouter;
