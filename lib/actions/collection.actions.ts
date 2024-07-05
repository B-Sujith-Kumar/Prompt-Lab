"use server";

import { auth, currentUser } from "@clerk/nextjs/server";
import { connectToDatabase } from "../database";
import Collection from "../database/models/collection.model";
import { handleError } from "../utils";
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import User from "../database/models/user.model";
import { revalidatePath } from "next/cache";

type createCollectionProps = {
  collectionName: string;
};

export const createCollection = async ({
  collectionName,
}: createCollectionProps) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const userDetails = await currentUser();
    // console.log(userDetails?.publicMetadata.userId);
    await connectToDatabase();

    const newCollection = await Collection.create({
      name: collectionName,
      prompts: [],
      author: new mongoose.Types.ObjectId(
        new mongoose.Types.ObjectId(
          userDetails?.publicMetadata.userId?.toString()
        )
      ),
    });

    const author = await User.findById(userDetails?.publicMetadata.userId);
    author.collections.push(newCollection._id);
    await author.save();

    return JSON.parse(JSON.stringify(newCollection));
  } catch (error) {
    handleError(error);
  }
};

export const fetchAuthorCollections = async () => {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDatabase();
    const userDetails = await currentUser();

    const collections = await Collection.find({
      author: new mongoose.Types.ObjectId(
        userDetails?.publicMetadata.userId?.toString()
      ),
    });
    return JSON.parse(JSON.stringify(collections));
  } catch (error) {
    handleError(error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const removePromptFromCollection = async (
  promptId: string,
  collectionId: string
) => {
  try {
    await connectToDatabase();
    const collection = await Collection.findById(collectionId);
    if (!collection) {
      throw new Error("Collection not found");
    }
    collection.prompts = collection.prompts.filter(
      (prompt: mongoose.Types.ObjectId) => prompt.toString() !== promptId
    );
    await collection.save();
  } catch (error) {
    handleError(error);
  }
};
