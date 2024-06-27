import RecentlyAdded from "@/components/shared/Prompts/RecentlyAdded";
import UserPrompts from "@/components/shared/Prompts/UserPrompts";
import { Button } from "@/components/ui/button";
import { getAllPrompts, getPromptsByUser } from "@/lib/actions/prompts.actions";
import { getLikedPrompts, getUserData } from "@/lib/actions/user.actions";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import Image from "next/image";


const page = async () => {
  const { sessionClaims } = auth();
  const userId: any = sessionClaims?.userId as string;
  const userData = await getUserData({ id: userId });
  const prompts = await getPromptsByUser(userId);
  const likedPrompts = await getLikedPrompts(userId);
  console.log(likedPrompts.favorites)

  return (
    <div className="font-worksans max-sm:px-8 sm:px-16 text-white pb-8">
      <div className="mt-10 sm:flex sm:items-center sm:gap-6">
        <Image
          src={userData.photo}
          alt="profile image"
          width={70}
          height={70}
          className="rounded-full max-sm:mx-auto sm:mt-3"
        />
        <div className="flex flex-col gap-4 mt-4 sm:flex-1 ">
          <div className="flex flex-col sm:flex-row gap-4 sm:justify-between w-full items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl max-sm:text-center">
                {userData.firstName + " " + userData.lastName}
              </h1>
              <h1 className="text-lg max-sm:text-center text-gray-400">
                @{userData.username}
              </h1>
            </div>
          </div>
          <div className="flex justify-between sm:hidden">
            <div className="flex flex-col gap-1">
              <h1 className="text-center text-lg">{userData.prompts.length}</h1>
              <h1 className="text-center text-lg">Prompts</h1>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-center text-lg">
                {userData.followers.length}
              </h1>
              <h1 className="text-center text-lg">Followers</h1>
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="text-center text-lg">
                {userData.following.length}
              </h1>
              <h1 className="text-center text-lg">Following</h1>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-12  max-sm:hidden mt-10">
        <div className="flex gap-2">
          <h1 className="text-center text-lg font-bold">
            {userData.prompts.length}
          </h1>
          <h1 className="text-center text-lg text-gray-300">Prompts</h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-center text-lg font-bold">
            {userData.followers.length}
          </h1>
          <h1 className="text-center text-lg text-gray-300">Followers</h1>
        </div>
        <div className="flex  gap-2">
          <h1 className="text-center text-lg font-bold">
            {userData.following.length}
          </h1>
          <h1 className="text-center text-lg text-gray-300">Following</h1>
        </div>
      </div>
      <div className="mt-10 border-t-[0.5px] border-t-slate-500">
        <h1 className="text-2xl font-semibold font-montserrat pt-8 text-center">
          Prompts
        </h1>
        <UserPrompts
          data={prompts}
          emptyTitle="No prompts found"
          emptyStateSubtext="Come back later"
          collectionType="All_Prompts"
          limit={6}
          page={1}
          totalPages={2}
        />
      </div>
      <div className="mt-10">
        <h1 className="text-2xl font-semibold font-montserrat pt-8 text-center">
          Liked Prompts
        </h1>
        <UserPrompts
          data={likedPrompts.favorites}
          emptyTitle="No prompts found"
          emptyStateSubtext="Come back later"
          collectionType="All_Prompts"
          limit={6}
          page={1}
          totalPages={2}
        />
      </div>
    </div>
  );
};

export default page;

