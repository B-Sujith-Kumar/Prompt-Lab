import Hero from "@/components/shared/Hero/Hero";
import RecentlyAdded from "@/components/shared/Prompts/RecentlyAdded";
import Search from "@/components/shared/Prompts/Search";
import { getAllPrompts } from "@/lib/actions/prompts.actions";
import { SearchParamProps } from "@/types";
import React from "react";
import TagFilter from "@/components/shared/Prompts/TagFilter"

export default async function Home({searchParams} : SearchParamProps) {
    const page = Number(searchParams?.page) || 1;
    const searchText = searchParams?.query as string || '';
    const tag = searchParams?.tag as string || '';
  const prompts = await getAllPrompts({
    query: searchText,
    page,
    limit: 6,
    collectionType: "All_Prompts",
    tag
  });
  return (
    <div className="pb-6">
      <Hero />
      <div className="flex text-white gap-0 flex-col font-worksans pl-32  max-[1130px]:pl-12 max-[1130px]:pr-12 lg:pr-12 max-md:px-4 sm:flex-row sm:items-centers sm:gap-4">
        <Search />
        <TagFilter />
      </div>
      <RecentlyAdded
        data={prompts?.data}
        emptyTitle="No prompts found"
        emptyStateSubtext="Come back later"
        collectionType="All_Prompts"
        limit={6}
        page={1}
        totalPages={2}
      />
    </div>
  );
}
