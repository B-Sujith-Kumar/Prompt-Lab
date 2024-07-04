import { getPromptsInfinite } from "@/lib/actions/prompts.actions";
import React from "react";

const Page = async () => {
  const prompts = await getPromptsInfinite({query: ""});
  console.log(prompts)
  return <div></div>;
};

export default Page;
