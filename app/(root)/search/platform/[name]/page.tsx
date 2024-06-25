import SearchPrompts from "@/components/shared/SearchPromptResult/SearchPrompts";
import { getAllPromptsByPlatform } from "@/lib/actions/prompts.actions";
import { SearchParamProps } from "@/types"

const getPromptsByPlatform = async (name?: string) => {
    const prompts = await getAllPromptsByPlatform(name);
    return prompts;
}
const page = async({params: {name}} : SearchParamProps) => {
    name = name?.replaceAll('%20', ' ');
    const prompts = await getPromptsByPlatform(name);
  return (
    <div className="text-white font-worksans px-16 max-lg:px-12 max-md:px-8 max-sm:px-5">
      <h1 className="text-3xl font-montserrat mt-8 font-semibold tracking-wide">
        {name} Prompts
      </h1>
      <p className="text-slate-400 mt-4 text-lg max-md:text-base max-sm:leading-relaxed">
        Unlock your creativity with free {name} prompts on PromptLab. Browse our
        large catalogue of {name} prompts and get inspired and more productive
        today.
      </p>
      <div className="mt-4">
        <SearchPrompts
          data={prompts}
          emptyTitle="No prompts found"
          emptyStateSubtext="Sorry. Please come again later"
        />
      </div>
    </div>
  )
}

export default page
