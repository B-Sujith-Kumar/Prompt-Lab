"use server";

import { UpdateUserParams, createUserParams } from "@/types";
import { handleError } from "../utils";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import Prompt from "../database/models/prompt.model";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";

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

export const getUserDataPopulatedFollows = async (id: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(id).populate({
      path: "followers following",
    });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const getUserWithFollowers = async (id: string) => {
  try {
    await connectToDatabase();
    const user = await User.findById(id).populate({ path: "followers" });
    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
};

export const getUsersWithAllowedEmailNotification = async (id: string) => {
    try {
        await connectToDatabase();
        const user = await User.findById(id).populate({ path: "sendEmailNotification" });
        if (!user) throw new Error("User not found");
        return JSON.parse(JSON.stringify(user));
    } catch (error) {
        handleError(error);
    }
}

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

interface GetFollowingStatusParams {
  currentUserId: string;
  targetUserId: string;
}

export const getFollowingStatus = async ({
  currentUserId,
  targetUserId,
}: GetFollowingStatusParams) => {
  await connectToDatabase();

  const user = await User.findById(currentUserId);
  const isFollowing = user.following.includes(targetUserId);

  return { isFollowing };
};

interface ToggleFollowStatusParams {
  currentUserId: string;
  targetUserId: string;
}

export const toggleFollowStatus = async ({
  currentUserId,
  targetUserId,
}: ToggleFollowStatusParams) => {
  await connectToDatabase();

  const currentUser = await User.findById(currentUserId);
  const targetUser = await User.findById(targetUserId);

  if (!currentUser || !targetUser) {
    throw new Error("User not found");
  }

  if (currentUser.following.includes(targetUserId)) {
    currentUser.following = currentUser.following.filter(
      (userId: mongoose.Types.ObjectId) => userId.toString() !== targetUserId
    );
    targetUser.followers = targetUser.followers.filter(
      (userId: mongoose.Types.ObjectId) => userId.toString() !== currentUserId
    );
  } else {
    currentUser.following.push(new mongoose.Types.ObjectId(targetUserId));
    targetUser.followers.push(new mongoose.Types.ObjectId(currentUserId));
  }

  await currentUser.save();
  await targetUser.save();

  return { success: true };
};

export const checkIsFollowing = async (userId: string, id: string) => {
  try {
    const main = await User.findById(id);
    const follower = await User.findById(userId);
    if (main.followers.includes(userId) && follower.following.includes(id)) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

export const handleFollow = async ({
  userId,
  id,
}: {
  userId: string;
  id: string;
}) => {
  await connectToDatabase();

  const main = await User.findById(id);
  const follower = await User.findById(userId);

  if (!main || !follower) {
    throw new Error("User not found");
  }

  if (main.followers.includes(userId) && follower.following.includes(id)) {
    main.followers = main.followers.filter(
      (user: mongoose.Types.ObjectId) => user.toString() !== userId
    );
    follower.following = follower.following.filter(
      (user: mongoose.Types.ObjectId) => user.toString() !== id
    );
    follower.allowEmailNotification = follower.allowEmailNotification.filter(
      (user: mongoose.Types.ObjectId) => user.toString() !== id
    );
  } else {
    main.followers.push(new mongoose.Types.ObjectId(userId));
    follower.following.push(new mongoose.Types.ObjectId(id));
    follower.allowEmailNotification.push(new mongoose.Types.ObjectId(id));
  }

  await main.save();
  await follower.save();
  revalidatePath(`/user/${id}`);
};
