// import mongoose, { Schema, models } from "mongoose";

// const UserSchema = new Schema({
//   clerkId: { type: String, required: true, unique: true },
//   username: { type: String, required: true, unique: true },
//   email: { type: String, required: true, unique: true },
//   photo: { type: String, required: true },
//   prompts: {
//     type: [mongoose.Schema.Types.ObjectId],
//     default: [],
//   },
//   favorites: {
//     type: [mongoose.Schema.Types.ObjectId],
//     default: [],
//   },
//   following: {
//     type: [mongoose.Schema.Types.ObjectId],
//     default: [],
//   },
//   followers: {
//     type: [mongoose.Schema.Types.ObjectId],
//     default: [],
//   },
// });

// const User = models.User || mongoose.model("User", UserSchema);

// export default User;

import mongoose, { Schema, models, Document } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  username: string;
  email: string;
  photo: string;
  prompts: mongoose.Types.ObjectId[];
  favorites: mongoose.Types.ObjectId[];
  following: mongoose.Types.ObjectId[];
  followers: mongoose.Types.ObjectId[];
  collections: mongoose.Types.ObjectId[];
  firstName: string;
  lastName: string;
}

const UserSchema = new Schema({
  clerkId: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  photo: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  prompts: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Prompt",
    default: [],
  },
  favorites: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Prompt",
    default: [],
  },
  following: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  followers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  collections: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Collection",
      default: [],
    },
  ],
});

const User = models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
