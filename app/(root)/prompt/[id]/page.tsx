import { getPromptById } from "@/lib/actions/prompts.actions";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params: { id } }: SearchParamProps) => {
  const prompt = await getPromptById(id);
  console.log(prompt)
  return (
    <section className="flex max-md:flex-col max-md:max-w-xl md:max-w-6xl mx-auto gap-8  mt-10 md:px-16 font-worksans text-white max-sm:px-6">
        <div>
            <Image
                src={prompt.thumbnail}
                alt={prompt.title}
                width={500}
                height={500}
                className="rounded-xl  w-full hover:scale-[1.02] transition-transform duration-300 ease-in-out object-contain"
            />
        </div>
        <div>
            <h1 className="font-montserrat text-2xl font-semibold leading-loose max-sm:text-xl">{prompt.title}</h1>
            <p className="mt-7 text-base text-gray-300 leading-7"><p className="text-white text-lg font-medium">What is this prompt about?:</p>{prompt.description}</p>
            <p className="mt-7"><span className="text-white text-lg font-medium">Posted by: </span> 
            <Link href="/" className=" text-purple-400 cursor-pointer text-lg">{prompt.author.username}</Link></p>
        </div>
    </section>
  );
};
export default page;
