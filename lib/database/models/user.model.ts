import mongoose, { Schema, models } from "mongoose";

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  prompts: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
  },
});

const User = models.User || mongoose.model("User", UserSchema);

export default User;
