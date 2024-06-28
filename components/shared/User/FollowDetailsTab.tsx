"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { auth, useAuth } from "@clerk/nextjs";
import { getFollowingStatus, toggleFollowStatus } from "@/lib/actions/user.actions";

const FollowDetailsTab = ({ userData, userId }: any) => {
  const [followers, setFollowers]: any = useState<any>(userData.followers);
  const [following, setFollowing]: any = useState<any>(userData.following);
  const [followingStatus, setFollowingStatus] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    const fetchFollowingStatus = async () => {
      const status: any = {};
      for (const follower of [...followers, ...following]) {
        const { isFollowing } = await getFollowingStatus({
          currentUserId: userData._id,
          targetUserId: follower._id,
        });
        status[follower._id] = isFollowing;
      }
      setFollowingStatus(status);
    };
    fetchFollowingStatus();
  }, [followers, following, userData._id]);

  const handleFollow = async (followerId: string) => {
    const { success } = await toggleFollowStatus({
      currentUserId: userData._id,
      targetUserId: followerId,
    });

    if (success) {
      setFollowingStatus((prevStatus: any) => ({
        ...prevStatus,
        [followerId]: !prevStatus[followerId],
      }));
    }
  };

  return (
    <div>
      <div className="flex justify-between sm:hidden mt-4">
        <div className="flex gap-2">
          <h1 className="text-center text-lg font-bold">{userData.prompts.length}</h1>
          <h1 className="text-center text-lg text-gray-300">Prompts</h1>
        </div>
        <div className="flex flex-col gap-1">
          <Dialog>
            <DialogTrigger className="flex gap-2 text-white font-worksans">
              <h1 className="text-center text-lg font-bold">
                {userData.followers.length}
              </h1>
              <h1 className="ttext-center text-lg text-gray-300">Followers</h1>
            </DialogTrigger>
            <DialogContent className="text-white font-worksans max-w-sm">
              <DialogHeader>
                <DialogTitle className="font-montserrat text-lg mb-4">
                  Followers
                </DialogTitle>
                <DialogDescription className="">
                  {followers.map((follower: any) => (
                    <div key={follower._id} className="flex justify-between items-center mb-4 gap-2">
                      <Link href={`/user/${follower._id}`} className="flex items-center gap-3">
                        <Image
                          src={follower.photo}
                          alt={follower.username}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <p className="text-lg font-medium truncate">{follower.firstName + " " + follower.lastName}</p>
                      </Link>
                      {userId !== follower._id && <Button
                        className="bg-btn-primary"
                        onClick={() => handleFollow(follower._id)}
                      >
                        {followingStatus[follower._id] ? "Following" : "Follow"}
                      </Button>}
                    </div>
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-1">
          <Dialog>
            <DialogTrigger className="flex gap-2 text-white font-worksans">
              <h1 className="text-center text-lg font-bold">
                {userData.following.length}
              </h1>
              <h1 className="ttext-center text-lg text-gray-300">Following</h1>
            </DialogTrigger>
            <DialogContent className="text-white font-worksans max-w-sm">
              <DialogHeader>
                <DialogTitle className="font-montserrat text-lg mb-4">
                  Following
                </DialogTitle>
                <DialogDescription className="">
                  {following.map((followed: any) => (
                    <div key={followed._id} className="flex justify-between items-center mb-4 gap-2">
                      <Link href={`/user/${followed._id}`} className="flex items-center gap-3">
                        <Image
                          src={followed.photo}
                          alt={followed.username}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <p className="text-lg font-medium truncate">{followed.firstName + " " + followed.lastName}</p>
                      </Link>
                      {userId !== followed._id && <Button
                        className="bg-btn-primary"
                        onClick={() => handleFollow(followed._id)}
                      >
                        {followingStatus[followed._id] ? "Following" : "Follow"}
                      </Button>}
                    </div>
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <div className="flex gap-12 max-sm:hidden mt-10">
        <div className="flex gap-2">
          <h1 className="text-center text-lg font-bold">
            {userData.prompts.length}
          </h1>
          <h1 className="text-center text-lg text-gray-300">Prompts</h1>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger className="flex gap-2 text-white font-worksans">
              <h1 className="text-center text-lg font-bold">
                {userData.followers.length}
              </h1>
              <h1 className="ttext-center text-lg text-gray-300">Followers</h1>
            </DialogTrigger>
            <DialogContent className="text-white font-worksans">
              <DialogHeader>
                <DialogTitle className="font-montserrat text-lg mb-4">
                  Followers
                </DialogTitle>
                <DialogDescription className="">
                  {followers.map((follower: any) => (
                    <div key={follower._id} className="flex justify-between items-center mb-4">
                      <Link href={`/user/${follower._id}`} className="flex items-center gap-3">
                        <Image
                          src={follower.photo}
                          alt={follower.username}
                          width={50}
                          height={50}
                          className="rounded-full"
                        />
                        <p className="text-lg font-medium">{follower.firstName + " " + follower.lastName}</p>
                      </Link>
                     {userId !== follower._id &&  <Button
                        className="bg-btn-primary"
                        onClick={() => handleFollow(follower._id)}
                      >
                        {followingStatus[follower._id] ? "Following" : "Follow"}
                      </Button>}
                    </div>
                  ))}
                </DialogDescription>
              </DialogHeader>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex gap-2">
          <Dialog>
          <DialogTrigger className="flex gap-2 text-white font-worksans">
            <h1 className="text-center text-lg font-bold">
              {userData.following.length}
            </h1>
            <h1 className="ttext-center text-lg text-gray-300">Following</h1>
          </DialogTrigger>
          <DialogContent className="text-white font-worksans">
            <DialogHeader>
              <DialogTitle className="font-montserrat text-lg mb-4">
                Following
              </DialogTitle>
              <DialogDescription className="">
                {following.map((followed: any) => (
                  <div key={followed._id} className="flex justify-between items-center mb-4">
                    <Link href={`/user/${followed._id}`} className="flex items-center gap-3">
                      <Image
                        src={followed.photo}
                        alt={followed.username}
                        width={50}
                        height={50}
                        className="rounded-full"
                      />
                      <p className="text-lg font-medium">{followed.firstName + " " + followed.lastName}</p>
                    </Link>
                    {userId !== followed._id && <Button
                      className="bg-btn-primary"
                      onClick={() => handleFollow(followed._id)}
                    >
                      {followingStatus[followed._id] ? "Following" : "Follow"}
                    </Button>}
                  </div>
                ))}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </div>
    </div>
  );
};

export default FollowDetailsTab;