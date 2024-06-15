import PromptForm from "@/components/shared/Prompts/PromptForm";
import { auth } from "@clerk/nextjs";
import Sidebar from "@/components/shared/Sidebar/Sidebar";

const CreatePrompt = async () => {
  const { sessionClaims } = auth();
  const userId: any = sessionClaims?.userId as string;
//   console.log(userId);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-white font-montserrat mt-4 max-sm:text-xl md:text-center max-md:pl-10 text-2xl font-semibold orange_gradient">
          Create & Upload Prompt
        </h1>
        <PromptForm userId={userId} type="Create" />
      </div>
    </div>
  );
};

export default CreatePrompt;
