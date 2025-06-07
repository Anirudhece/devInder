import mongoose from "mongoose";

/** this function will establish connection bw server and mongoDB */
export const connectDB = async () => {
    mongoose.connect('mongodb+srv://anirudh:kuHJuULKm13uPEyW@cluster0.ssbyo2o.mongodb.net/devtinder')
}
