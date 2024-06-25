"use server";

import { GetAllPromptParams, createPromptParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Prompt, { IPrompt } from "../database/models/prompt.model";
import Collection from "../database/models/collection.model";
import mongoose from "mongoose";
import Tag from "../database/models/tags.models";
import { revalidatePath } from "next/cache";

const populatePrompt = async (query: any) => {
  return query
    .populate({
      path: "author",
      model: User,
      select: "_id username",
    })
    .populate({
      path: "tags",
      model: Tag,
      select: "_id name",
    });
};

export const createPrompt = async ({
  prompt,
  userId,
  path,
}: createPromptParams) => {
  try {
    await connectToDatabase();
    const author = await User.findById(userId);
    let tags = [];
    if (prompt.tags) {
      for (const tag of prompt.tags) {
        let tagModel = await Tag.findOne({ name: tag });
        if (!tagModel) {
          tagModel = await Tag.create({ name: tag });
        }
        tags.push(tagModel._id);
      }
    }
    const finalPrompt = {
      ...prompt,
      tags: tags,
    };

    if (!author) {
      throw new Error("User not found");
    }

    const newPrompt = await Prompt.create({
      ...finalPrompt,
      author: new mongoose.Types.ObjectId(userId),
    });
    author.prompts.push(newPrompt._id);
    await author.save();
    const collection = await Collection.findById(prompt.collection);
    if (!collection) {
      throw new Error("Collection not found");
    }
    collection.prompts.push(newPrompt._id);
    await collection.save();
    if (tags) {
      for (const tag of tags) {
        const tagModel = await Tag.findById(tag);
        if (!tagModel) {
          throw new Error("Tag not found");
        }
        tagModel.prompts.push(newPrompt._id);
        await tagModel.save();
      }
    }
    return JSON.parse(JSON.stringify(newPrompt));
  } catch (err) {
    handleError(err);
  }
};

export const getPromptById = async (id: string) => {
  try {
    await connectToDatabase();
    const prompt = await populatePrompt(Prompt.findById(id));
    if (!prompt) {
      throw new Error("Prompt not found");
    }
    return JSON.parse(JSON.stringify(prompt));
  } catch (err) {
    handleError(err);
  }
};

export const getAllPrompts = async ({
  query,
  limit = 6,
  page,
  tag,
}: GetAllPromptParams) => {
  try {
    await connectToDatabase();
    let tagCondition = {};
    if (tag) {
      const tagId = await getIdTagByName(tag);
      if (tagId) {
        tagCondition = { tags: { $in: [tagId] } };
      } else {
        return {
          data: [],
          totalPages: 0,
        };
      }
    }
    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const conditions = {
      $and: [titleCondition, tagCondition],
    };
    const promptsQuery = Prompt.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(0)
      .limit(limit);
    const prompts = await populatePrompt(promptsQuery);
    const promptCount = await Prompt.countDocuments(conditions);
    return {
      data: JSON.parse(JSON.stringify(prompts)),
      totalPages: Math.ceil(promptCount / limit),
    };
  } catch (err) {
    handleError(err);
  }
};

export const getIdTagByName = async (name: string) => {
  try {
    await connectToDatabase();
    const tag = await Tag.findOne({ name });
    if (!tag) {
      return null;
    }
    return tag._id;
  } catch (err) {
    handleError(err);
  }
};

export const deletePrompt = async ({
  promptId,
  path,
}: {
  promptId: string;
  path: string;
}) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      throw new Error("Prompt not found");
    }
    const deletedPrompt = await Prompt.findByIdAndDelete(promptId);
    const author = await User.findById(prompt.author);
    if (!author) {
      throw new Error("Author not found");
    }
    author.prompts = author.prompts.filter(
      (id: string) => id.toString() !== promptId
    );
    author.favorites = author.favorites.filter(
      (id: string) => id.toString() !== promptId
    );
    await author.save();
    const collection = await Collection.findById(prompt.collection);
    if (!collection) {
      throw new Error("Collection not found");
    }
    collection.prompts = collection.prompts.filter(
      (id: string) => id.toString() !== promptId
    );
    await collection.save();
    for (const tag of prompt.tags) {
      const tagModel = await Tag.findById(tag);
      if (!tagModel) {
        throw new Error("Tag not found");
      }
      tagModel.prompts = tagModel.prompts.filter(
        (id: string) => id.toString() !== promptId
      );
      await tagModel.save();
    }
    if (deletedPrompt) revalidatePath(path);
  } catch (err) {
    handleError(err);
  }
};

export const getRelatedPrompts = async ({
  prompt,
  limit = 6,
}: {
  prompt: IPrompt;
  limit: number;
}) => {
  try {
    await connectToDatabase();
    const getPrompt = await Prompt.findById(prompt._id);
    if (!getPrompt) {
      throw new Error("Prompt not found");
    }
    const relatedPrompts = await populatePrompt(
      Prompt.find({
        _id: { $ne: prompt._id },
        tags: { $in: getPrompt.tags },
      }).limit(limit)
    );
    const totalPages = Math.ceil(relatedPrompts?.length / limit);
    return {
      data: JSON.parse(JSON.stringify(relatedPrompts)),
      totalPages,
    };
  } catch (err) {
    console.log(err);
  }
};

export const getPromptsByUser = async (id: string) => {
  try {
    await connectToDatabase();
    const prompts = await populatePrompt(Prompt.find({ author: id }));
    return JSON.parse(JSON.stringify(prompts));
  } catch (err) {
    handleError(err);
  }
};

export const updatePrompt = async ({
  prompt,
  userId,
  id,
}: {
  prompt: any;
  userId: string;
  id: string;
}) => {
  try {
    await connectToDatabase();
    const {
      title,
      description,
      content,
      thumbnail,
      platform,
      collection,
      tags,
    } = prompt;
    const author = await User.findById(userId);
    if (!author) {
      throw new Error("User not found");
    }
    const getPrompt = await Prompt.findById(id);
    if (!getPrompt) {
      throw new Error("Prompt not found");
    }
    const tagDocs = await Tag.find({ name: { $in: tags } });
    const newTagIds = tagDocs.map((tag) => tag._id.toString());
    const oldTagIds = getPrompt.tags.map((tag: mongoose.Types.ObjectId) =>
      tag.toString()
    );
    getPrompt.title = title;
    getPrompt.description = description;
    getPrompt.content = content;
    getPrompt.thumbnail = thumbnail;
    getPrompt.platform = platform;
    if (
      getPrompt.collection &&
      getPrompt.collection.toString() !== collection
    ) {
      await Collection.findByIdAndUpdate(getPrompt.collection, {
        $pull: { prompts: id },
      });
      await Collection.findByIdAndUpdate(collection, {
        $push: { prompts: id },
      });
    }
    getPrompt.collection = collection;

    await Tag.updateMany(
      { _id: { $in: oldTagIds } },
      { $pull: { prompts: id } }
    );

    getPrompt.tags = newTagIds.map((tag) => new mongoose.Types.ObjectId(tag));

    await Tag.updateMany(
      { _id: { $in: newTagIds } },
      { $push: { prompts: id } }
    );

    await getPrompt.save();

    revalidatePath(`/prompt/${id}`);

    return JSON.parse(JSON.stringify(getPrompt));
  } catch (err) {
    handleError(err);
  }
};

export const likePrompt = async ({
  promptId,
  userId,
}: {
  promptId: string;
  userId: string;
}) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      throw new Error("Prompt not found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    if (user.favorites.includes(new mongoose.Types.ObjectId(promptId))) {
      user.favorites = user.favorites.filter(
        (id: string) => id.toString() !== promptId
      );
    } else {
      user.favorites.push(new mongoose.Types.ObjectId(promptId));
    }

    if (prompt.likes.includes(new mongoose.Types.ObjectId(userId))) {
      prompt.likes = prompt.likes.filter(
        (id: string) => id.toString() !== userId
      );
    } else {
      prompt.likes.push(new mongoose.Types.ObjectId(userId));
    }

    await user.save();
    await prompt.save();

    revalidatePath(`/prompt/${promptId}`);

    return JSON.parse(JSON.stringify(prompt));
  } catch (err) {
    handleError(err);
  }
};

export const addComment = async ({
  promptId,
  userId,
  comment,
}: {
  promptId: string;
  userId: string;
  comment: string;
}) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      throw new Error("Prompt not found");
    }
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    prompt.comments.push({
      author: new mongoose.Types.ObjectId(userId),
      content: comment,
    });
    await prompt.save();
    revalidatePath(`/prompt/${promptId}`);
    return JSON.parse(JSON.stringify(prompt));
  } catch (err) {
    handleError(err);
  }
};

export const getAllComments = async (promptId: string) => {
  try {
    await connectToDatabase();
    const prompt = await Prompt.findById(promptId).populate({
      path: "comments.author",
      model: User,
      select: "_id username photo",
    });
    if (!prompt) {
      throw new Error("Prompt not found");
    }
    return prompt.comments;
  } catch (err) {
    handleError(err);
  }
};

export const getAllPromptByTagId = async (tagId: string) => {
  try {
    await connectToDatabase();
    const tag = await Tag.findById(tagId).populate({
      path: "prompts",
      populate: [
        { path: "author", select: "username _id" },
        { path: "tags", select: "name _id" },
        { path: "likes", select: "username _id" },
        {
          path: "comments",
          populate: { path: "author", select: "username _id" },
        },
      ],
    });
    return JSON.parse(JSON.stringify(tag ? tag : []));
  } catch (err) {
    handleError(err);
  }
};

export const getNameTag = async (tagId: string) => {
  try {
    await connectToDatabase();
    const tag = await Tag.findById(tagId);
    if (!tag) {
      throw new Error("Tag not found");
    }
    return tag.name;
  } catch (err) {
    handleError(err);
  }
};
