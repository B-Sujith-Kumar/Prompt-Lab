import mongoose, { Schema, models, Document } from "mongoose";


export interface ITag extends Document {
  name: string;
  prompts: mongoose.Types.ObjectId[];
}
const TagSchema = new Schema(
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
        default: [],
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {timestamps: true, suppressReservedKeysWarning: true}
);

const Tag = models.Tag || mongoose.model<ITag>("Tag", TagSchema);

export default Tag;