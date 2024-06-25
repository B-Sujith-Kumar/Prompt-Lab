import SearchPrompts from "@/components/shared/SearchPromptResult/SearchPrompts";
import { getAllPromptByTagId, getNameTag } from "@/lib/actions/prompts.actions";
import { SearchParamProps } from "@/types";

const getPrompts = async (id: string) => {
  const tag = await getAllPromptByTagId(id);
  return tag.prompts;
};

const getTagById = async (id: string) => {
  const tagName = await getNameTag(id);
  return tagName;
};

const page = async ({ params: { id } }: SearchParamProps) => {
  const tag = await getTagById(id);
  const prompts: any = await getPrompts(id);
  return (
    <div className="text-white font-worksans px-16 max-lg:px-12 max-md:px-8 max-sm:px-5">
      <h1 className="text-3xl font-montserrat mt-8 font-semibold tracking-wide">
        {tag} Prompts
      </h1>
      <p className="text-slate-400 mt-6 text-lg max-md:text-base">
        Unlock your creativity with free {tag} prompts on PromptPal. Browse our
        large catalogue of {tag} prompts and get inspired and more productive
        today.
      </p>
      <div className="mt-10">
        <SearchPrompts
          data={prompts}
          emptyTitle="No prompts found"
          emptyStateSubtext="Sorry. Please come again later"
        />
      </div>
    </div>
  );
};

export default page;
