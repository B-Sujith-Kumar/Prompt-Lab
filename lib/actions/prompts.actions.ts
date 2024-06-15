"use server"

import { createPromptParams } from "@/types"
import { handleError } from "../utils"
import { connectToDatabase } from "../database"
import User from "../database/models/user.model"
import Prompt from "../database/models/prompt.model"
import Collection from "../database/models/collection.model"
import mongoose from "mongoose"

export const createPrompt = async ({prompt, userId, path} : createPromptParams) => {
    try {
        await connectToDatabase();
        console.log(prompt, userId);
        const author = await User.findById(userId);
        if (!author) {
            throw new Error("User not found");
        }
        const newPrompt = await Prompt.create({
            ...prompt,
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
        return JSON.parse(JSON.stringify(newPrompt));
    } catch (err) {
        handleError(err);
    }
}