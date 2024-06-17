"use server"

import { GetAllPromptParams, createPromptParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Prompt, { IPrompt } from "../database/models/prompt.model"
import Collection from "../database/models/collection.model"
import mongoose from "mongoose"
import Tag from "../database/models/tags.models"
import { revalidatePath } from "next/cache"

const populatePrompt = async(query: any) => {
    return query
    .populate({
        path: "author", model: User, select: '_id username'
    })
    .populate({
        path: "tags", model: Tag, select: '_id name'
    })
}

export const createPrompt = async ({prompt, userId, path} : createPromptParams) => {
    try {
        await connectToDatabase();
        // console.log(prompt, userId);
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

        // console.log(finalPrompt);

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
         const prompt = await populatePrompt(Prompt.findById(id));
        if (!prompt) {
            throw new Error("Prompt not found");
        }
        return JSON.parse(JSON.stringify(prompt));
    } catch (err) {
        handleError(err);
    }
}

export const getAllPrompts = async ({query, limit = 6, page, category} : GetAllPromptParams) => {
    try {
       await connectToDatabase();
        const conditions = {};
        const promptsQuery = Prompt.find(conditions).sort({ createdAt: 'desc' }).skip(0).limit(limit);
        const prompts = await populatePrompt(promptsQuery);
        const promptCount = await Prompt.countDocuments(conditions);
        return {
            data: JSON.parse(JSON.stringify(prompts)),
            totalPages: Math.ceil(promptCount / limit),
        };
    } catch (err) {
        handleError(err);
    }
}

export const deletePrompt = async ({promptId, path} : {promptId: string, path: string}) => {
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
        author.prompts = author.prompts.filter((id : string) => id.toString() !== promptId);
        author.favorites = author.favorites.filter((id : string) => id.toString() !== promptId);
        await author.save();
        const collection = await Collection.findById(prompt.collection);
        if (!collection) {
            throw new Error("Collection not found");
        }
        collection.prompts = collection.prompts.filter((id : string) => id.toString() !== promptId);
        await collection.save();
        for (const tag of prompt.tags) {
            const tagModel = await Tag.findById(tag);
            if (!tagModel) {
                throw new Error("Tag not found");
            }
            tagModel.prompts = tagModel.prompts.filter((id : string) => id.toString() !== promptId);
            await tagModel.save();
        }
        if (deletedPrompt) revalidatePath(path);
    } catch (err) {
        handleError(err);
    }
}

export const getRelatedPrompts = async ({prompt, limit = 6} : {prompt: IPrompt, limit: number}) => {
    try {
        await connectToDatabase();
        const getPrompt = await Prompt.findById(prompt._id);
        if (!getPrompt) {
            throw new Error("Prompt not found");
        }
        const relatedPrompts = await populatePrompt(Prompt.find({_id: {$ne: prompt._id}, tags: { $in: getPrompt.tags } }).limit(limit));
        const totalPages = Math.ceil(relatedPrompts?.length / limit);
        return {
            data: JSON.parse(JSON.stringify(relatedPrompts)),
            totalPages,
        };
    } catch (err) {
        console.log(err)
    }
}