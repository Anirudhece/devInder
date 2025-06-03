import mongoose from "mongoose";

const connectionRequestSchema = new mongoose.Schema(
  {
    fromUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    toUserId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: [
          "accepted",
          "rejected",
          "ignored",
          "interested",
        ],
        message: "{VALUE} is not correct",
      },
    },
  },
  { timestamps: true }
);

connectionRequestSchema.pre("save", function (next) {
  const { fromUserId, toUserId } = this;
  if (fromUserId.toString() === toUserId.toString())
    throw new Error("fromUserId can not be equal to toUserID");

  next();
});

const ConnectionRequest = mongoose.model(
  "ConnectionRequest",
  connectionRequestSchema
);

export default ConnectionRequest;
