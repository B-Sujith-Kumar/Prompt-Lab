import { IPrompt } from "@/lib/database/models/prompt.model";
import React from "react";
import Card from "./Card";
import Pagination from "../Pagination/Pagination";

type CollectionProps = {
  data: IPrompt[];
  emptyTitle: string;
  emptyStateSubtext: string;
  page: number;
  limit: number;
  totalPages?: number;
  collectionType: "All_Prompts" | "Related_Prompts" | "My_Prompts";
  urlParamName?: string;
};
const RecentlyAdded = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="text-white mt-4" id="prompts">
          <div className="flex flex-col items-center gap-10 pl-32  max-[1130px]:pl-12 max-[1130px]:pr-12 lg:pr-12 max-md:px-4">
            <ul className="grid w-full mt-4 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-3 xl:gap-10">
              {data.map((prompt) => {
                return (
                  <li key={prompt.title} className="flex justify-center">
                    <Card prompt={prompt} />
                  </li>
                );
              })}
            </ul>
            {totalPages > 1 && <Pagination urlParamName={urlParamName} page={page} totalPages={totalPages}/>}
          </div>
        </div>
      ) : (
        <div className="font-worksans text-white mt-7 pl-32  max-[1130px]:pl-12 max-[1130px]:pr-12 lg:pr-12 max-md:px-4 text-center">
          <div className="bg-gray-800 py-4 rounded-xl">
            <h1 className="text-2xl capitalize font-semibold">{emptyTitle}</h1>
            <p className="mt-4 text-gray-300">{emptyStateSubtext}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default RecentlyAdded;
