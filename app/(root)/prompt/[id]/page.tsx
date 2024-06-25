import PromptContainer from "@/components/shared/Prompts/PromptContainer";
import RecentlyAdded from "@/components/shared/Prompts/RecentlyAdded";
import RelatedPrompts from "@/components/shared/Prompts/RelatedPrompts";
import { auth } from "@clerk/nextjs";
import {
  getAllComments,
  getPromptById,
  getRelatedPrompts,
} from "@/lib/actions/prompts.actions";
import { IPrompt } from "@/lib/database/models/prompt.model";
import { aiImages } from "@/lib/exports";
import { SearchParamProps } from "@/types";
import {
  faCircleXmark,
  faComment,
  faTag,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { getUserData } from "@/lib/actions/user.actions";
import { Button } from "@/components/ui/button";
import DetailsBar from "@/components/shared/Prompts/DetailsBar";
import Comments from "@/components/shared/Prompts/Comments";

const getUserImage = async (id: string) => {
  const userData = await getUserData({ id });
  return userData.photo;
};

const getComments = async (id: string) => {
  const comments = await getAllComments(id);
  return comments;
};

const page = async ({ params: { id } }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId: any = sessionClaims?.userId as string;
  const prompt: IPrompt = await getPromptById(id);
  const userData = await getUserData({ id: prompt.author._id });
  const userImage = await getUserImage(userId);
  const comments = await getComments(id);
  const relatedPrompts = await getRelatedPrompts({ prompt, limit: 6 });
  return (
    <div className="md:px-8 max-sm:px-6 pb-6">
      <section className="flex max-md:flex-col max-md:max-w-xl md:max-w-7xl mx-auto gap-8  mt-10   font-worksans text-white md:items-center md:gap-10">
        <div className="md:w-[74%] w-full">
          <Image
            src={prompt.thumbnail}
            alt={prompt.title}
            width={1400}
            height={400}
            className="max-h-[400px] w-full object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col justify-between h-[100%]">
          <h1 className="font-montserrat text-2xl font-semibold max-sm:leading-9 md:leading-9 max-sm:text-xl">
            {prompt.title}
          </h1>
          <div className="mt-6 text-base text-gray-300 leading-7">
            <p className="text-white  text-lg font-medium">
              What is this prompt about ?
            </p>
            <p className="mt-3">{prompt.description}</p>
          </div>
          <p className="mt-6 text-white text-lg font-medium">
            Posted by:{" "}
            <Link
              href={`/user/${prompt.author._id}`}
              className=" text-purple-400 cursor-pointer text-lg capitalize"
            >
              {prompt.author.username}
            </Link>
          </p>
          <div className="flex flex-wrap gap-2 mt-6 font-worksans">
            {prompt.tags.map((tag: { _id: string; name: string }) => (
              <Link href={`/search/tags/${tag._id}`}>
                <div
                  key={tag._id}
                  className="bg-gray-600 border-[0.8px] border-slate-500 text-white text-lg px-4 py-2 rounded-full flex items-center justify-between gap-2 hover:bg-btn-primary hover:text-white transition-colors duration-300 ease-in-out hover:cursor-pointer"
                >
                  <FontAwesomeIcon icon={faTag} className="cursor-pointer" />
                  <span className="text-base">{tag.name}</span>
                </div>
              </Link>
            ))}
          </div>
          <div className="flex gap-2 items-center mt-6">
            {prompt.platform.map((platform: string) => (
              <>
                <Image
                  src={aiImages[platform as keyof typeof aiImages]}
                  alt="Image"
                  width={30}
                  className="bg-white rounded-full p-[2px]"
                />
              </>
            ))}
          </div>
        </div>
      </section>
      <DetailsBar userData={userData} prompt={prompt} userId={userId} />
      <PromptContainer prompt={prompt.content} />
      <section
        id="comments"
        className="max-md:max-w-xl md:max-w-7xl max-w-7xl mx-auto gap-4 md:gap-4 text-white font-worksans"
      >
        <h1 className="text-white font-montserrat pt-8 text-2xl font-semibold">
          {prompt.comments.length} Comments
        </h1>
        <Comments
          userData={userData}
          prompt={prompt}
          photo={userImage}
          userId={userId}
        />
        {comments &&
          comments.map((comment: any) => (
            <div className="flex gap-4 mt-4 items-center mb-10">
              <Link href={`/user/${comment.author._id}`}>
                <Image
                  src={comment.author.photo}
                  width={50}
                  height={50}
                  alt="profile pic"
                  className="rounded-full hover:cursor-pointer"
                />
              </Link>
              <div className="w-full flex flex-col gap-2">
                <Link
                  href={`/user/${comment.author._id}`}
                  className="text-white font-montserrat font-medium hover:cursor-pointer gap-4 text-sm"
                >
                  @ {comment.author.username}
                </Link>
                <p className="text-white text-sm">{comment.content}</p>
              </div>
            </div>
          ))}
      </section>
      <section className="my-8 flex flex-col max-md:max-w-xl md:max-w-7xl max-w-7xl mx-auto gap-4 md:gap-4 text-white font-worksans">
        <h2 className="font-montserrat text-2xl font-semibold">
          Related Prompts
        </h2>
        <RelatedPrompts
          data={relatedPrompts?.data}
          emptyTitle="No prompts found"
          emptyStateSubtext="Come back later"
          collectionType="All_Prompts"
          limit={6}
          page={1}
          totalPages={2}
        />
      </section>
    </div>
  );
};
export default page;
