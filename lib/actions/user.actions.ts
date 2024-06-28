"use server";

import { UpdateUserParams, createUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Prompt from "../database/models/prompt.model";
import { revalidatePath } from "next/cache";

export const createUser = async (user: createUserParams) => {
  try {
    await connectToDatabase();
    console.log(user);
    const newUser = await User.create(user);
    console.log(newUser);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
};

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    await Promise.all([
      Prompt.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),
    ]);

    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

export const getUserData = async ({ id }: { id: string }) => {
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const getLikedPrompts = async (id: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(id);
    if (!user) throw new Error("User not found");
    const likedPrompts = await User.findById(id).populate({
      path: "favorites",
      populate: [
        {
          path: "author",
          select: "_id username",
        },
        {
          path: "tags",
          select: "_id name",
        },
      ],
    });
    return JSON.parse(JSON.stringify(likedPrompts));
  } catch (error) {
    handleError(error);
  }
};
