import Hero from "@/components/shared/Hero/Hero";
import RecentlyAdded from "@/components/shared/Prompts/RecentlyAdded";
import Search from "@/components/shared/Prompts/Search";
import { getAllPrompts, getMostLikedChatGPTPrompts } from "@/lib/actions/prompts.actions";
import { SearchParamProps } from "@/types";
import React from "react";
import TagFilter from "@/components/shared/Prompts/TagFilter";
import RelatedPrompts from "@/components/shared/Prompts/RelatedPrompts";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const tag = (searchParams?.tag as string) || "";
  const prompts = await getAllPrompts({
    query: searchText,
    page,
    limit: 6,
    collectionType: "All_Prompts",
    tag,
  });
  const chatGPTPrompts = await getMostLikedChatGPTPrompts();
  return (
    <div className="pb-6">
      <Hero />
      <div className="flex text-white gap-0 flex-col font-worksans pl-32  max-[1130px]:pl-12 max-[1130px]:pr-12 lg:pr-12 max-md:px-4 sm:flex-row sm:items-centers sm:gap-4 mt-4 mb-6">
        <Search />
        <TagFilter />
      </div>
      <RecentlyAdded
        data={prompts?.data}
        emptyTitle="No prompts found"
        emptyStateSubtext="Come back later"
        collectionType="All_Prompts"
        limit={6}
        page={page}
        totalPages={prompts?.totalPages}
      />
      <h1 className="font-montserrat pl-32  max-[1130px]:pl-12 max-[1130px]:pr-12 lg:pr-12 max-md:px-4 text-2xl mt-10 text-white font-semibold">Famous ChatGPT Prompts</h1>
        <RecentlyAdded
            data={chatGPTPrompts?.data}
            emptyTitle="No prompts found"
            emptyStateSubtext="Come back later"
            collectionType="All_Prompts"
            limit={6}
            page={page}
        />
    </div>
  );
}
