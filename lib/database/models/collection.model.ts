import mongoose, { Schema, models, Document } from "mongoose";

export interface ICollection extends Document {
  name: string;
  description: string;
  prompts: mongoose.Types.ObjectId[];
  author: mongoose.Types.ObjectId;
  createdAt: Date;
}

const CollectionSchema = new Schema(

  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    prompts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Prompt",
      },
    ],
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);

const Collection =
  models.Collection ||
  mongoose.model<ICollection>("Collection", CollectionSchema);

export default Collection;
