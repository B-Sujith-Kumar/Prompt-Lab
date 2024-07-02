import RecentlyAdded from "@/components/shared/Prompts/RecentlyAdded";
import UserProfilePrompts from "@/components/shared/Prompts/UserProfilePrompts";
import UserPrompts from "@/components/shared/Prompts/UserPrompts";
import FollowDetailsTab from "@/components/shared/User/FollowDetailsTab";
import { Button } from "@/components/ui/button";
import { getAllPrompts, getPromptsByUser } from "@/lib/actions/prompts.actions";
import {
  getUserData,
  getUserDataPopulatedFollows,
} from "@/lib/actions/user.actions";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { faBell, faBellSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import mongoose from "mongoose";
import { revalidatePath } from "next/cache";
import Image from "next/image";

const isFollowing = async (userId: string, id: string) => {
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



const checkAllowedEmailNotification = async (userId: string, id: string) => {
  try {
    const main = await User.findById(id);
    const follower = await User.findById(userId);
    if (
      main.sendEmailNotification.includes(new mongoose.Types.ObjectId(userId))
    ) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};

const page = async ({ params: { id } }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId: any = sessionClaims?.userId as string;
  const userData = await getUserDataPopulatedFollows(id);
  const prompts = await getPromptsByUser(id);
  const follower = await isFollowing(userId, id);
  const allowEmailNotification = await checkAllowedEmailNotification(
    userId,
    id
  );
  const handleAllowEmailNotification = async () => {
    "use server"
    try {
      const main = await User.findById(id);
      const follower = await User.findById(userId);
      if (
        main.sendEmailNotification.includes(new mongoose.Types.ObjectId(userId))
      ) {
        main.sendEmailNotification = main.sendEmailNotification.filter(
          (user: mongoose.Types.ObjectId) => user.toString() !== userId
        );
      } else {
        main.sendEmailNotification.push(new mongoose.Types.ObjectId(userId));
      }
  
      await main.save();
      revalidatePath(`/user/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  const handleFollow = async () => {
    "use server";
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
      main.sendEmailNotification = main.sendEmailNotification.filter(
        (user: mongoose.Types.ObjectId) => user.toString() !== userId
      );
    } else {
      main.followers.push(new mongoose.Types.ObjectId(userId));
      follower.following.push(new mongoose.Types.ObjectId(id));
      main.sendEmailNotification.push(new mongoose.Types.ObjectId(userId));
    }

    await main.save();
    await follower.save();
    revalidatePath(`/user/${id}`);
  };

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
          <div className="flex flex-col  sm:flex-row gap-4 sm:justify-between w-full items-center">
            <div className="flex flex-col gap-2">
              <h1 className="text-2xl max-sm:text-center">
                {userData.firstName + " " + userData.lastName}
              </h1>
              <h1 className="text-lg max-sm:text-center text-gray-400">
                @{userData.username}
              </h1>
            </div>
            {userId !== id && (
              <div className="flex gap-6 max-md:w-full max-md:gap-3 max-md:flex-row">
                <form action={handleFollow} className="max-sm:w-full">
                  <button className="bg-btn-primary py-2 max-sm:rounded-xl font-medium rounded-lg max-sm:w-full sm:px-20 max-md:flex-1">
                    {follower ? "Unfollow" : "Follow"}
                  </button>
                </form>
                {follower && (
                  <form action={handleAllowEmailNotification}>
                    <button className="text-white bg-btn-primary rounded-full w-10 h-10 flex items-center justify-center">
                      {!follower ? (
                        ""
                      ) : allowEmailNotification ? (
                        <FontAwesomeIcon icon={faBell} aria-label="Notifications are ON"/>
                      ) : (
                        <FontAwesomeIcon icon={faBellSlash} />
                      )}
                    </button>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6">
        <FollowDetailsTab userData={userData} userId={userId} />
      </div>
      <div className="mt-10 border-t-[0.5px] border-t-slate-500">
        <h1 className="text-2xl font-semibold font-montserrat pt-8 text-center">
          Prompts
        </h1>
        <UserProfilePrompts
          data={prompts.data}
          emptyTitle="No prompts found"
          emptyStateSubtext="Come back later"
        />
      </div>
    </div>
  );
};

export default page;
