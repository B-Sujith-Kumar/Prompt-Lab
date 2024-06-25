import PromptContainer from "@/components/shared/Prompts/PromptContainer";
import RecentlyAdded from "@/components/shared/Prompts/RecentlyAdded";
import RelatedPrompts from "@/components/shared/Prompts/RelatedPrompts";
import {
  getPromptById,
  getRelatedPrompts,
} from "@/lib/actions/prompts.actions";
import { IPrompt } from "@/lib/database/models/prompt.model";
import { aiImages } from "@/lib/exports";
import { SearchParamProps } from "@/types";
import { faCircleXmark, faTag } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params: { id } }: SearchParamProps) => {
  const prompt: IPrompt = await getPromptById(id);
  const relatedPrompts = await getRelatedPrompts({ prompt, limit: 6 });
  return (
    <div className="md:px-8 max-sm:px-6 pb-6">
      <section className="flex max-md:flex-col max-md:max-w-xl md:max-w-7xl mx-auto gap-8  mt-10   font-worksans text-white md:items-center md:gap-10">
        <div className="md:w-[74%] w-full">
          <Image
            src={prompt.thumbnail}
            alt={prompt.title}
            width={1400}
            height={549}
            className="max-h-[549px] w-full object-cover rounded-lg"
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
              <div
                key={tag._id}
                className="bg-gray-600 border-[0.8px] border-slate-500 text-white text-lg px-4 py-2 rounded-full flex items-center justify-between gap-2 hover:bg-btn-primary hover:text-white transition-colors duration-300 ease-in-out hover:cursor-pointer"
              >
                <FontAwesomeIcon icon={faTag} className="cursor-pointer" />
                <span className="text-base">{tag.name}</span>
              </div>
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
      <PromptContainer prompt={prompt.content} />
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
