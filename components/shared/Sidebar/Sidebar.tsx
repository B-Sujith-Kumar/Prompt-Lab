"use client";
import { useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenFancy } from "@fortawesome/free-solid-svg-icons";
import { faWandMagicSparkles } from "@fortawesome/free-solid-svg-icons";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="font-worksans">
      <div className="hidden lg:flex flex-col w-64 min-h-screen border-r-[0.4px] text-white">
        <div className="p-4 pl-6 mt-4 text-3xl font-semibold border-b-[0.4px]">
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
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-300 rounded hover:bg-gray-700"
          >
            Contact
          </Link>
        </nav>
      </div>

      <button
        className="lg:hidden fixed top-28 left-4 bg-gray-800 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "Close" : "Open"} Sidebar
      </button>

      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        ></div>
      )}

      {/* Sidebar for small screens */}
      <div
        className={`lg:hidden fixed inset-0 z-40 transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } w-64 bg-gray-800 text-white`}
      >
        <div className="p-4">Logo</div>
        <button
          className="lg:hidden bg-gray-800 mt-10 text-white p-2 rounded"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "Close" : "Open"} Sidebar
        </button>
        <nav className="flex-1 px-4 py-2 space-y-1">
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-300 rounded hover:bg-gray-700"
          >
            Home
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-300 rounded hover:bg-gray-700"
          >
            About
          </Link>
          <Link
            href="/"
            className="block px-4 py-2 text-sm text-gray-300 rounded hover:bg-gray-700"
          >
            Contact
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
