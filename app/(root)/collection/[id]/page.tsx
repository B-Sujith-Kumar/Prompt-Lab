import DeleteCollection from "@/components/shared/Collections/DeleteCollection";
import SearchPrompts from "@/components/shared/SearchPromptResult/SearchPrompts";
import { getCollectionWithPrompts } from "@/lib/actions/user.actions";
import { SearchParamProps } from "@/types";

const Page = async ({ params: { id } }: SearchParamProps) => {
  const collection = await getCollectionWithPrompts(id);
  return (
    <div className="text-white font-worksans px-16 max-lg:px-12 max-md:px-8 max-sm:px-5">
      <h1 className="text-2xl max-[380px]:text-sm max-sm:text-xl font-montserrat mt-8  tracking-wide flex items-center justify-between">
        <div>
          <span className="font-semibold text-4xl max-sm:text-2xl max-[380px]:text-lg">{collection.name} </span>
          Collection
        </div>
        <div className="text-sm">
          <DeleteCollection collectionId={collection._id} />
        </div>
      </h1>
      <div className="mt-4">
        <SearchPrompts
          data={collection.prompts}
          emptyTitle="No prompts found"
          emptyStateSubtext="Add prompts to this collection to get started."
        />
      </div>
    </div>
  );
};

export default Page;
