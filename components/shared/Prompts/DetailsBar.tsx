"use client";
import { Button } from "@/components/ui/button";
import {
  faBookmark,
  faComment,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import Image from "next/image";
import { likePrompt } from "@/lib/actions/prompts.actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  addPromptToCollection,
  checkIsFollowing,
  getCollections,
  handleFollow,
} from "@/lib/actions/user.actions";
import ClipLoader from "react-spinners/ClipLoader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";

const DetailsBar = ({ userData, prompt, userId }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [likes, setLikes] = useState(prompt.likes.length);
  const [liked, setLiked] = useState(prompt.likes.includes(userId));
  const [collections, setCollections] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const checkFollowing = async () => {
      setIsLoading(true);
      const following: any = await checkIsFollowing(userId, userData._id);
      setIsFollowing(following);
      setIsLoading(false);
    };

    checkFollowing();
  }, [userId, userData._id]);

  useEffect(() => {
    const fetchCollections = async () => {
      const collections = await getCollections(userId);
      console.log(collections);
      setCollections(collections);
    };
    fetchCollections();
  }, []);

  const savePrompt = async (collectionId: string) => {
    try {
      const res = await addPromptToCollection(collectionId, prompt._id);
      if (res?.success) {
        if (res.message === "Exists") {
            toast({
                title: "Already saved",
                description: "Prompt is already saved to this collection.",
                color: "white"
            });
            return;
        }
        toast({
            title: "Saved to collection",
            description: "Prompt has been successfully saved to collection.",
            color: "white"
          });
      }
    } catch (error) {
      console.error("Error adding prompt to collection:", error);
    }
  };

  const handleFollowClick = async () => {
    setShowSpinner(true);
    await handleFollow({ userId, id: userData._id });
    const following: any = await checkIsFollowing(userId, userData._id);
    setIsFollowing(following);
    setShowSpinner(false);
  };

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

      router.refresh();
    } catch (error) {
      console.error("Error liking prompt:", error);
    }
  };

  return (
    <div className="mt-8 max-md:max-w-xl md:max-w-7xl max-w-7xl mx-auto gap-4 md:gap-4 text-white font-worksans">
      <div className="flex [816px]:items-center gap-8 justify-between max-[816px]:flex-col">
        <div className="flex gap-8 max-[816px]:gap-0 items-center max-[816px]:w-full max-[816px]:justify-between">
          <Link
            href={`/user/${prompt.author._id}`}
            className="flex gap-3 items-center"
          >
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
          </Link>
          {userId !== userData._id && (
            <div>
              <button
                className="bg-btn-primary py-2 px-8 rounded-full font-semibold"
                onClick={handleFollowClick}
                disabled={showSpinner}
              >
                {showSpinner ? (
                  <ClipLoader loading={showSpinner} color="#ffffff" size={20} />
                ) : isFollowing ? (
                  "Following"
                ) : (
                  "Follow"
                )}
              </button>
            </div>
          )}
        </div>
        <div className="flex gap-4 items-center flex-wrap">
          <Button
            className={`flex gap-2 ${
              liked ? "bg-btn-primary" : "bg-gray-600"
            } text-lg`}
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
          <Popover>
            <PopoverTrigger className="flex items-center gap-2 bg-gray-600 text-lg py-[6px] px-4 rounded-lg">
              <FontAwesomeIcon icon={faBookmark} />
              <p>Save</p>
            </PopoverTrigger>
            <PopoverContent className="text-white font-worksans bg-background w-56">
              <div className="flex flex-col gap-2 ">
                {collections.map((collection: any) => (
                  <p
                    key={collection._id}
                    className="hover:cursor-pointer"
                    onClick={() => savePrompt(collection._id)}
                  >
                    {collection.name}
                  </p>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DetailsBar;
