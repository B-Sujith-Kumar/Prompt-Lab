"use client";
import React, { useEffect, useState } from "react";
import ClientCard from "../AllPromptsCard/ClientCard";
import { getPrompts } from "@/lib/actions/prompts.actions";
import BeatLoader from "react-spinners/BeatLoader";

const AllPrompts = ({ userId }: { userId: string }) => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [titleFilter, setTitleFilter] = useState("");
  const [tagsFilter, setTagsFilter] = useState("");
  const [platformFilter, setPlatformFilter] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const prompts = await getPrompts();
      console.log(prompts);
      setData(prompts);
      setFilteredData(prompts);
      setLoading(false);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filterPrompts = () => {
      const filtered = data.filter((prompt: any) => {
        const matchesTitle = prompt.title
          .toLowerCase()
          .includes(titleFilter.toLowerCase());
        const matchesTags = tagsFilter
          .split(",")
          .every((tag) =>
            prompt.tags.some((promptTag: any) =>
              promptTag.name.toLowerCase().includes(tag.trim().toLowerCase())
            )
          );
        const matchesPlatform =
          platformFilter === "" || prompt.platform.includes(platformFilter);

        return matchesTitle && matchesTags && matchesPlatform;
      });
      setFilteredData(filtered);
    };

    filterPrompts();
  }, [titleFilter, tagsFilter, platformFilter, data]);

  return (
    <div className="text-white mt-4 px-2" id="prompts">
      <div className="flex flex-col items-center gap-5">
        <div className="flex gap-4 mb-4 w-full justify-between sm:items-center px-4 max-sm:flex-col font-worksans">
          <input
            type="text"
            placeholder="Filter by title"
            value={titleFilter}
            onChange={(e) => setTitleFilter(e.target.value)}
            className="p-3 focus:outline-none  bg-background border border-gray-700 flex-1 rounded-full px-4"
          />
          <input
            type="text"
            placeholder="Filter by tags (comma separated)"
            value={tagsFilter}
            onChange={(e) => setTagsFilter(e.target.value)}
            className="p-3 focus:outline-none  bg-background border border-gray-700 flex-1 rounded-full px-4"
          />
          <select
            value={platformFilter}
            onChange={(e) => setPlatformFilter(e.target.value)}
            className="p-3 focus:outline-none  bg-background border border-gray-700 flex-1 rounded-full px-4"
          >
            <option value="">All Platforms</option>
            <option value="ChatGPT">ChatGPT</option>
            <option value="Midjourney">Midjourney</option>
            <option value="Notion AI">Notion AI</option>
            <option value="Bard">Bard</option>
            <option value="Leonardo AI">Leonardo AI</option>
            <option value="Stable Diffusion">Stable Diffusion</option>
          </select>
        </div>
        <p className="font-montserrat text-2xl font-semibold">{titleFilter || tagsFilter || platformFilter ? 'Search Results' : "Prompts"}</p>
        {loading ? (
          <div className="flex justify-center items-center h-32">
            <BeatLoader color={"#fff"} loading={true} size={15} />
          </div>
        ) : filteredData.length > 0 ? (
          <ul className="grid w-full mt-4 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4 xl:gap-10 px-4 font-worksans">
            {filteredData.map((prompt: any) => (
              <li key={prompt._id} className="flex justify-center">
                <ClientCard prompt={prompt} userId={userId} />
              </li>
            ))}
          </ul>
        ) : loading ? (
          <BeatLoader color={"#fff"} loading={true} size={15} />
        ) : (
          <div className="font-worksans text-white mt-7 w-full text-center px-16">
            <div className="bg-gray-800 py-4 rounded-xl w-full">
              <h1 className="text-2xl capitalize font-semibold">
                No Prompts found
              </h1>
              <p className="mt-4 text-gray-300">Come back later</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AllPrompts;
