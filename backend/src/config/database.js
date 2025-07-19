import mongoose from "mongoose";

/** this function will establish connection bw server and mongoDB */
export const connectDB = async () => {
    mongoose.connect(process.env.MONGO_DB_URI);
}
