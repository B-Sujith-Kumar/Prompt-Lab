import Hero from "@/components/shared/Hero/Hero";
import RecentlyAdded from "@/components/shared/Prompts/RecentlyAdded";
import { getAllPrompts } from "@/lib/actions/prompts.actions";
import React from "react";

export default async function Home() {
  const prompts = await getAllPrompts({
    query: "",
    page: 1,
    limit: 6,
    collectionType: "All_Prompts",
    category: "",
  });
  return (
    <div className="pb-6">
      <Hero />
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
