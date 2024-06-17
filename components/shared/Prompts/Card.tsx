import { IPrompt } from "@/lib/database/models/prompt.model";
import {
  faArrowUpFromBracket,
  faComment,
  faTag,
  faThumbsUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import { aiImages } from "@/lib/exports";
import { auth } from "@clerk/nextjs";
import DeleteConfirmation from "./DeleteConfirmation";

type CardProps = {
  prompt: IPrompt;
};
const Card = ({ prompt }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const isPromptCreator = prompt.author._id.toString() === userId;
  return (
    <div className="group relative font-worksans border-[0.7px] flex min-h-[380px] w-full max-w-[400px] flex-col overflow-hidden rounded-xl bg-background shadow-md transition-all hover:shadow-lg md:max-w-68 md:min-h-[350px]">
      <Link
        href={`/prompt/${prompt._id}`}
        style={{ backgroundImage: `url(${prompt.thumbnail})` }}
        className="flex-center flex-grow bg-gray-50 bg-cover bg-center text-grey-500"
      ></Link>
      {isPromptCreator && <DeleteConfirmation promptId={prompt._id} />}
      <Link
        href={`/prompt/${prompt._id}`}
        className="flex min-h-[230px] flex-col gap-3 p-5 md:gap-4"
      >
        <div className="flex flex-wrap gap-2">
          {prompt.tags.map(
            (tag, i) =>
              i < 2 && (
                <span
                  key={tag.name}
                  className="text-xs flex items-center gap-1  text-white border-[0.8px] border-slate-500 px-2 py-1 rounded-full hover:bg-btn-primary hover:text-white transition-colors duration-300 ease-in-out"
                >
                  <FontAwesomeIcon icon={faTag} className="cursor-pointer" />
                  {tag.name}
                </span>
              )
          )}
        </div>
        <p className="font-montserrat leading-7 font-semibold">
          {prompt.title}
        </p>
        {/* <p className="font-worksans line-clamp-2 text-gray-400">{prompt.description}</p> */}
        <p className="text-sm">
          Posted by : @{" "}
          <span className="text-indigo-300">{prompt.author.username}</span>
        </p>
        <div className="flex items-center justify-between mt-2">
          <div className="flex gap-2 items-center">
            {prompt.platform.map((platform: string) => (
              <>
                <Image
                  src={aiImages[platform as keyof typeof aiImages]}
                  alt="Image"
                  width={25}
                  className="bg-white rounded-full"
                />
              </>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faThumbsUp} />
              <p>{prompt.likes.length}</p>
            </div>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon icon={faComment} />
              <p>{prompt.comments.length}</p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
