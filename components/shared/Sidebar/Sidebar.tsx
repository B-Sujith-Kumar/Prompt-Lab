"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowLeft,
  faArrowRight,
  faBriefcase,
  faCaretDown,
  faPenFancy,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

import { usePathname } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { getUserCollections } from "@/lib/actions/user.actions";

const Sidebar = () => {
  const { isLoaded, userId, sessionId, getToken } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [collections, setCollections] = useState<any[]>([]);
  const [collapsibleOpen, setCollapsibleOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const path = usePathname();

  useEffect(() => {
    setIsLoading(true);
    const fetchCollections = async () => {
      try {
        const data = await getUserCollections(userId!);
        setCollections(data);
        console.log(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching collections:", error);
      }
    };

    fetchCollections();
  }, [userId]);

  return (
    <div className="font-worksans relative">
      <div className="hidden lg:flex flex-col w-64 min-h-screen h-full border-r-[0.6px] border-slate-600 text-white">
        <div className="p-4 pb-6 pl-6 mt-4 text-2xl font-semibold border-b-[0.6px] border-slate-600">
          Workspace
        </div>
        <nav className="flex-1 flex flex-col gap-3 px-4 py-5 space-y-1">
          <Link
            href="/prompt/create"
            className={`flex py-2 gap-4 items-center ${
              path === "/prompt/create" ? "bg-gray-700" : ""
            } text-white hover:bg-gray-700 px-3 rounded-md`}
          >
            <FontAwesomeIcon icon={faPenFancy} />
            Upload Prompt
          </Link>
          <Link
            href="/ask-ai"
            className={`flex py-2 gap-4 items-center text-white ${
              path === "/ask-ai" ? "bg-gray-700" : ""
            } hover:bg-gray-700 px-3 rounded-md`}
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Ask AI
          </Link>
         {!isLoading && <div>
            <Collapsible>
              <CollapsibleTrigger
                className={`flex w-full py-2 gap-4 items-center text-white  hover:bg-gray-700 px-3 rounded-md`}
                onClick={() => setCollapsibleOpen(!collapsibleOpen)}
              >
                <FontAwesomeIcon icon={faBriefcase} />
                <div className="flex items-center justify-between w-full">
                  <p>Collections</p>
                  {collapsibleOpen ? (
                    <FontAwesomeIcon icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {collections.map((collection) => (
                  <Link
                    key={collection._id}
                    href={`/collection/${collection._id}`}
                    target="_blank"
                    className={`flex py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md`}
                  >
                    <p className="ml-8">{collection.name}</p>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>}
        </nav>
      </div>

      <button
        className="lg:hidden absolute top-[26px] z-10 left-4 text-white p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? "" : <FontAwesomeIcon icon={faArrowRight} />}
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
        } w-64 bg-background text-white`}
      >
        <div className="p-4 mt-24 flex items-center justify-between">
          <h2 className="text-white text-2xl font-semibold">Workspace</h2>
          <button
            className="lg:hidden text-white p-2 rounded"
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
            href="/prompt/create"
            className={`flex py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md ${
              path === "/prompt/create" ? "bg-gray-700" : ""
            }`}
          >
            <FontAwesomeIcon icon={faPenFancy} />
            Upload Prompt
          </Link>
          <Link
            href="/ask-ai"
            className={`flex py-2 gap-4 items-center text-white ${
              path === "/ask-ai" ? "bg-gray-700" : ""
            } hover:bg-gray-700 px-3 rounded-md`}
          >
            <FontAwesomeIcon icon={faWandMagicSparkles} />
            Ask AI
          </Link>
          {!isLoading && <div>
            <Collapsible>
              <CollapsibleTrigger
                className={`flex w-full py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md`}
                onClick={() => setCollapsibleOpen(!collapsibleOpen)}
              >
                <FontAwesomeIcon icon={faBriefcase} />
                <div className="flex items-center justify-between w-full">
                  <p>Collections</p>
                  {collapsibleOpen ? (
                    <FontAwesomeIcon icon={faAngleUp} />
                  ) : (
                    <FontAwesomeIcon icon={faAngleDown} />
                  )}
                </div>
              </CollapsibleTrigger>
              <CollapsibleContent>
                {collections.map((collection) => (
                  <Link
                    key={collection._id}
                    href={`/collection/${collection._id}`}
                    target="_blank"
                    className={`flex py-2 gap-4 items-center text-white hover:bg-gray-700 px-3 rounded-md`}
                  >
                    <p className="ml-8">{collection.name}</p>
                  </Link>
                ))}
              </CollapsibleContent>
            </Collapsible>
          </div>}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
