"use client";
import { Button } from "@/components/ui/button";
import { faComment, faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { likePrompt } from "@/lib/actions/prompts.actions";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DetailsBar = ({ userData, prompt, userId }: any) => {
  const [likes, setLikes] = useState(prompt.likes.length);
  const [liked, setLiked] = useState(prompt.likes.includes(userId));
  const router = useRouter();
//   console.log(userData, prompt, userId);

  const handleLike = async () => {
    try {
      const updatedPrompt = await likePrompt({ promptId: prompt._id, userId });

      if (liked) {
        setLikes((prev: any) => prev - 1);
        setLiked(false);
      } else {
        setLikes((prev: any) => prev + 1);
        setLiked(true);
      }

      // You can also refresh the data if needed
      router.refresh();
    } catch (error) {
      console.error("Error liking prompt:", error);
    }
  };

  return (
    <div className="mt-8 max-md:max-w-xl md:max-w-7xl max-w-7xl mx-auto gap-4 md:gap-4 text-white font-worksans">
      <div className="flex [816px]:items-center gap-8 justify-between max-[816px]:flex-col">
        <div className="flex gap-8 max-[816px]:gap-0 items-center max-[816px]:w-full max-[816px]:justify-between">
          <div className="flex gap-3 items-center">
            <Image
              src={userData.photo}
              width={55}
              height={55}
              alt="profile pic"
              className="rounded-full"
            />
            <div className="flex flex-col gap-1">
              <h2 className="text-lg font-medium font-montserrat max-sm:text-base">
                {userData.firstName + " " + userData.lastName}
              </h2>
              <p className="text-sm text-slate-300">
                {userData.followers.length} Followers
              </p>
            </div>
          </div>
          <div>
            <button className="bg-btn-primary py-2 px-8 rounded-full font-semibold">
              Follow
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <Button
            className={`flex gap-2 ${liked ? 'bg-btn-primary' : 'bg-gray-600'} text-lg`}
            type="button"
            onClick={handleLike}
          >
            <FontAwesomeIcon icon={faThumbsUp} />
            <p>{liked ? "Unlike" : "Like"}</p>
            <p>{likes}</p>
          </Button>
          <Button className="flex gap-2 bg-gray-600 text-lg">
            <Link href="#comments" className="flex items-center gap-2 ">
              <FontAwesomeIcon icon={faComment} />
              <p>Comments</p>
              <p>{prompt.comments.length}</p>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DetailsBar;