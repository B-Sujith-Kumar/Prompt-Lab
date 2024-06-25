"use client"

import { Input } from "@/components/ui/input"
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { faMagnifyingGlass, faTag } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const TagFilter = () => {
    const [tag, setTag] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  useEffect(() => {
    let newUrl = ""
    const delayDebounceFn = setTimeout(() => {
        if (tag) {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: "tag",
                value: tag,
            });
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ["tag"],
            });
        }
        router.push(newUrl, {scroll: false});
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [tag, searchParams, router])
  return (
    <div className="flex gap-2 items-center max-h-[50px] mt-4 w-full overflow-hidden rounded-full bg-gray-800 px-6 py-2">
      <FontAwesomeIcon icon={faTag} />
      <Input
        type="text"
        placeholder="Enter tag..."
        onChange={(e) => setTag(e.target.value)}
        className="border-0 bg-gray-800 outline-offset-0 placeholder:text-gray-400 focus-visible:ring-0 focus-visible:ring-offset-0 text-lg"
      />
    </div>
  )
}

export default TagFilter
