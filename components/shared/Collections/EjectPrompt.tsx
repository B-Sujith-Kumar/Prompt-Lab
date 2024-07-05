"use client"

import { useToast } from "@/components/ui/use-toast";
import { removePromptFromCollection } from "@/lib/actions/collection.actions";
import { faEject } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const EjectPrompt = ({promptId, collectionId} : {promptId: string, collectionId: string}) => {
    const {toast} = useToast();
    const ejectPrompt = async () => {
        await removePromptFromCollection(promptId, collectionId);
        toast({
            title: "Removed from collection",
            description: "Prompt has been removed from this collection. Refresh the page to see changes.",
            color: "white"
        });
    }
  return (
      <button onClick={ejectPrompt} className="text-gray-500 shadow-lg border-black bg-white px-2 py-1 absolute top-4 left-2 rounded-lg active:scale-95">
        <FontAwesomeIcon icon={faEject} />
      </button>
  );
};

export default EjectPrompt;
