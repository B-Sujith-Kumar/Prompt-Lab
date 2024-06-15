"use client";

import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

const PromptContainer = ({ prompt }: { prompt: string }) => {
  const [copySuccess, setCopySuccess] = useState("");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(prompt).then(
      () => {
        setCopySuccess("Copied!");
        setTimeout(() => setCopySuccess(""), 2000);
      },
      () => {
        setCopySuccess("Failed to copy");
      }
    );
  };

  return (
    <div className="md:max-w-7xl mt-8 max-md:max-w-xl  mx-auto p-4 font-worksans text-white shadow-lg rounded-lg border border-gray-200 px-6 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white font-montserrat">
          Prompt:
        </h2>
        <button
          onClick={copyToClipboard}
          className="text-sm text-white bg-gray-400 items-center px-3 py-2 gap-2 flex hover:text-blue-700 font-medium rounded-lg"
        >
          <FontAwesomeIcon icon={faClipboard} />
          {copySuccess ? "Copied to clipboard!" : "Copy"}
        </button>
      </div>
      <p className="text-white text-lg leading-8 max-sm:text-base max-sm:leading-loose">{prompt}</p>
    </div>
  );
};

export default PromptContainer;
