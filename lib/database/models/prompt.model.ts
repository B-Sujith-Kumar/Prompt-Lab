import mongoose, { Document, Schema, models } from "mongoose";

export interface IComment {
  user: string;
  content: string;
  createdAt: Date;
}

export interface IPrompt extends Document {
  _id: string;
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  thumbnail?: string;
  author: string;
  tags: string[];
  likes: string[];
  comments: IComment[];
}

const PromptSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: { type: String, required: true },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    thumbnail: {
      type: String,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    tags: [{ type: String }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: { type: String, required: true },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    platform: [
      {
        type: String,
        enum: [
          "ChatGPT",
          "Midjourney",
          "Notion AI",
          "Bard",
          "Leonardo AI",
          "Stable Diffusion",
        ],
      },
    ],
  },
  { timestamps: true }
);

const Prompt = models.Prompt || mongoose.model("Prompt", PromptSchema);

export default Prompt;
