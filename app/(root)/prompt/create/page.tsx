import PromptForm from "@/components/shared/Prompts/PromptForm";
import { auth } from "@clerk/nextjs";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
const CreatePrompt = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-4">
        <h1 className="text-white font-montserrat mt-4 text-center text-2xl font-semibold">
          Create Prompt
        </h1>
        <PromptForm userId={userId} type="Create" />
      </div>
    </div>
  );
};

export default CreatePrompt;
