import PromptForm from "@/components/shared/Prompts/PromptForm";
import { auth } from "@clerk/nextjs";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { SearchParamProps } from "@/types";
import UpdateForm from "@/components/shared/PromptUpdate/UpdateForm";
import { getPromptById } from "@/lib/actions/prompts.actions";

const UpdatePrompt = async ({params: {id}} : SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId: any = sessionClaims?.userId as string;
  const prompt = await getPromptById(id);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-white font-montserrat mt-4 max-sm:text-xl md:text-center max-md:pl-10 text-2xl font-semibold orange_gradient">
          Update Prompt
        </h1>
        <UpdateForm userId={userId} prompt={prompt} id={id} type="Create" />
      </div>
    </div>
  );
};

export default UpdatePrompt;
