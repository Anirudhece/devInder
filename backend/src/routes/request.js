import express from "express";
import { userAuth } from "../middlewares/auth.js";
import ConnectionRequest from "../models/ConnectionRequest.js";
import User from "../models/User.js";

const connectionRequestRouter = express.Router();

connectionRequestRouter.post(
  "/request/send/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      if (!fromUserId || !toUserId || !status)
        throw new Error("invalid data, missing fields.");

      const allowedStatus = ["ignored", "interested"];
      if (!allowedStatus.includes(status))
        throw new Error(`${status} is not a valid status.`);

      if (fromUserId.toString() === toUserId.toString())
        throw new Error("fromUserId can not be equal to toUserID");

      const toUser = await User.findById(toUserId);
      if (!toUser) throw new Error("toUserId does not exist");

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or: [
          { fromUserId, toUserId },
          { fromUserId: toUserId, toUserId: fromUserId },
        ],
      });

      if (existingConnectionRequest)
        throw new Error("connection request already sent");

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
      });

      const data = await connectionRequest.save();

      if (!data) throw new Error("connection request not saved");

      res.status(200).send({
        message: "connection request sent successfully",
        data,
        success:true,
      });
    } catch (err) {
      res.status(400).send({
        message: "error happened inside connection request",
        error: err.message,
        success:false,
      });
    }
    const user = req.user;
  }
);

connectionRequestRouter.post(
  "/request/review/:status/:toUserId",
  userAuth,
  async (req, res) => {
    try {
      const loggedInUSer = req.user;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      if (!toUserId || !status)
        throw new Error("invalid data, missing fields.");

      const allowedStatus = ["accepted", "rejected"];
      if (!allowedStatus.includes(status))
        throw new Error(`${status} is not a valid status.`);

      const _connectionRequest = await ConnectionRequest.findOne({
        _id: req.body.connectionRequestId,
        toUserId: loggedInUSer._id,
        status: "interested",
      });

      if (!_connectionRequest) throw new Error("connection request not found");

      _connectionRequest.status = status;

      const data = await _connectionRequest.save();

      if (!data) throw new Error("connection request not saved");

      res.status(200).send({
        message: "connection request saved successfully",
        data,
        success:true,
      });
    } catch (err) {
      res.status(400).send({
        message: "error happened inside connection request",
        error: err.message,
        success:false,
      });
    }
    const user = req.user;
  }
);

export default connectionRequestRouter;
