"use client";

import { Input } from "@/components/ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const Search = () => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  console.log(searchParams.toString());
  useEffect(() => {
    let newUrl = ""
    const delayDebounceFn = setTimeout(() => {
        if (query) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "query",
                value: query,
            });
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ["query"],
            });
        }
        router.push(newUrl, {scroll: false});
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router])
  return (
    <div className="flex gap-2 items-center max-h-[50px] mt-4 w-full overflow-hidden rounded-full bg-gray-800 px-6 py-2">
      <FontAwesomeIcon icon={faMagnifyingGlass} />
      <Input
        type="text"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
        className="border-0 bg-gray-800 outline-offset-0 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
      />
    </div>
  );
};

export default Search;
