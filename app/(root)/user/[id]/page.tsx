import { Button } from "@/components/ui/button";
import { getUserData } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";

const page = async ({ params: { id } }: SearchParamProps) => {
  const userData = await getUserData({ id });
  console.log(userData);
  return (
    <div className="font-worksans max-sm:px-8 sm:px-16 text-white">
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
                <h1 className="text-2xl text-center">{userData.firstName + " " + userData.lastName}</h1>
              <h1 className="text-lg max-sm:text-center text-gray-400">@{userData.username}</h1>
            </div>
            <button className="bg-btn-primary py-2 max-sm:rounded-xl rounded-sm max-sm:w-full sm:px-20">
              Follow
            </button>
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
              <h1 className="text-center text-lg font-bold">{userData.prompts.length}</h1>
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
    </div>
  );
};

export default page;
