"use server"

import { createPromptParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Prompt from "../database/models/prompt.model"
import Collection from "../database/models/collection.model"
import mongoose from "mongoose"
import Tag from "../database/models/tags.models"

const populatePrompt = async(query: any) => {
    return query
    .populate({
        path: "author", model: User, select: '_id username'
    })
    .populate({

    })
}

export const createPrompt = async ({prompt, userId, path} : createPromptParams) => {
    try {
        await connectToDatabase();
        console.log(prompt, userId);
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
        }

        if (!author) {
            throw new Error("User not found");
        }

        console.log(finalPrompt);

        const newPrompt = await Prompt.create({
            ...finalPrompt,
            author: new mongoose.Types.ObjectId(userId)
        })
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
}



export const getPromptById = async (id: string) => {
    try {
       await connectToDatabase();
         const prompt = await Prompt.findById(id);
        if (!prompt) {
            throw new Error("Prompt not found");
        }
        return JSON.parse(JSON.stringify(prompt));
    } catch (err) {
        handleError(err);
    }
}