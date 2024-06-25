// import mongoose, { Document, Schema, models } from "mongoose";

// export interface IComment {
//   user: string;
//   content: string;
//   createdAt: Date;
// }

// export interface IPrompt extends Document {
//   _id: string;
//   title: string;
//   description: string;
//   content: string;
//   createdAt: Date;
//   thumbnail?: string;
//   author: string;
//   tags: string[];
//   likes: string[];
//   comments: IComment[];
// }

// const PromptSchema = new Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//     },
//     description: { type: String, required: true },
//     content: {
//       type: String,
//       required: true,
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//     thumbnail: {
//       type: String,
//     },
//     author: {
//       type: Schema.Types.ObjectId,
//       ref: "User",
//       required: true,
//     },
//     tags: [{ type: String }],
//     likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
//     comments: [
//       {
//         user: {
//           type: Schema.Types.ObjectId,
//           ref: "User",
//         },
//         content: { type: String, required: true },
//         createdAt: {
//           type: Date,
//           default: Date.now,
//         },
//       },
//     ],
//     platform: [
//       {
//         type: String,
//         enum: [
//           "ChatGPT",
//           "Midjourney",
//           "Notion AI",
//           "Bard",
//           "Leonardo AI",
//           "Stable Diffusion",
//         ],
//       },
//     ],
//   },
//   { timestamps: true }
// );

// const Prompt = models.Prompt || mongoose.model("Prompt", PromptSchema);

// export default Prompt;

import mongoose, { Schema, models, Document } from "mongoose";

export interface IComment {
  user: mongoose.Types.ObjectId;
  content: string;
  createdAt: Date;
}

export interface ITag {
    name: string;
    _id: string
}

export interface IUser {
    username: string;
    _id: string;
}

export interface IPrompt {
  title: string;
  description: string;
  content: string;
  createdAt: Date;
  thumbnail: string;
//   author: mongoose.Types.ObjectId | {username: string, _id: string};
  author: IUser;
  tags: ITag[];
  likes: mongoose.Types.ObjectId[];
  comments: IComment[];
  platform: string[];
  collection?: mongoose.Types.ObjectId;
  _id: string;
}

const PromptSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
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
    tags: [{ type: Schema.Types.ObjectId, ref: "Tag" }],
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
      {
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        content: {
          type: String,
          required: true,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    collection: {
      type: Schema.Types.ObjectId,
      ref: "Collection",
    },
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
  { timestamps: true,
    suppressReservedKeysWarning: true
   }
);

const Prompt = models.Prompt || mongoose.model<IPrompt>("Prompt", PromptSchema);

export default Prompt;
