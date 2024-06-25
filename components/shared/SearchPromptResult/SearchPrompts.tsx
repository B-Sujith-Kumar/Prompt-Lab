import { IPrompt } from "@/lib/database/models/prompt.model";
import React from "react";
import Card from "../Prompts/Card";
import Pagination from "../Pagination/Pagination";

type CollectionProps = {
  data: IPrompt[];
  emptyTitle: string;
  emptyStateSubtext: string;
  urlParamName?: string;
};
const SearchPrompts = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  urlParamName,
}: CollectionProps) => {
  return (
    <>
      {data.length > 0 ? (
        <div className="text-white mt-4" id="prompts">
          <div className="flex flex-col items-center gap-10 ">
            <ul className="grid w-full mt-4 grid-cols-1 gap-5 max-sm:grid-cols-1 max-md:grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10">
              {data.map((prompt) => {
                return (
                  <li key={prompt.title} className="flex justify-center">
                    <Card prompt={prompt} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      ) : (
        <div className="font-worksans text-white mt-7 text-center w-full">
          <div className="bg-gray-800 py-4 rounded-xl">
            <h1 className="text-2xl capitalize font-semibold">{emptyTitle}</h1>
            <p className="mt-4 text-gray-300">{emptyStateSubtext}</p>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchPrompts;
