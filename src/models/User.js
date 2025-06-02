import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true, index: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "others"] },
  about: { type: String },
  photoUrl: { type: String },
  skills: [String],
});

const User = mongoose.model("User", userSchema);
export default User;
