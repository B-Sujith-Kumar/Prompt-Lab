"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faPenFancy,
} from "@fortawesome/free-solid-svg-icons";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-worksans">
      <div className="hidden lg:flex flex-col w-64 min-h-screen border-r-[0.6px] border-slate-600 text-white">
        <div className="p-4 pb-6 pl-6 mt-4 text-2xl font-semibold border-b-[0.6px] border-slate-600">
          Workspace
        </div>
        <nav className="flex-1 flex flex-col gap-3 px-4 py-5 space-y-1">
          <Link
            href="/"
            className="flex py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md"
          >
            <FontAwesomeIcon icon={faPenFancy} />
            Upload Prompt
          </Link>
          <Link
            href="/"
            className="flex py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md"
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Ask AI
          </Link>
        </nav>
      </div>

      <button
        className="lg:hidden fixed top-[115px] left-4  text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : <FontAwesomeIcon icon={faArrowRight} />}
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      <div
        className={`lg:hidden fixed inset-0 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64  bg-background text-white`}
      >
        <div className="p-4 mt-24 flex items-center justify-between">
          <h2 className="text-white text-2xl font-semibold">Workspace</h2>
          <button
            className="lg:hidden  text-white p-2 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? (
              <FontAwesomeIcon icon={faArrowLeft} />
            ) : (
              <FontAwesomeIcon icon={faArrowRight} />
            )}
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-3 px-4 py-5 space-y-1">
          <Link
            href="/"
            className="flex py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md"
          >
            <FontAwesomeIcon icon={faPenFancy} />
            Upload Prompt
          </Link>
          <Link
            href="/"
            className="flex py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md"
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Ask AI
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
