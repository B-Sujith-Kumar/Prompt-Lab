"use client";
import Markdown from "@/components/shared/AskAI/Markdown";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import {
  faArrowUp,
  faRobot,
  faStop,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useChat } from "ai/react";
import React from "react";

const Page = () => {
  const { messages, input, handleInputChange, handleSubmit, isLoading, stop } =
    useChat({
      api: "api/genai",
    });

  return (
    <div className="flex font-worksans text-white h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col justify-between relative lg:px-10 max-sm:px-4 max-lg:mt-4">
        <h1 className="text-white font-montserrat mt-4 max-sm:text-xl md:text-center max-lg:pl-10 text-2xl font-semibold orange_gradient lg:hidden sm:pl-12 sm:mt-3">
          Ask AI
        </h1>
        <div className="flex-1 overflow-y-auto px-10 mt-4 max-lg:mt-8 lg:mt-9 max-md:px-5 max-sm:px-1 pb-28">
          <div className="flex flex-col w-full text-left gap-4 whitespace-pre-wrap">
            {messages.map((m, index) => (
              <div
                className={`flex items-start gap-3 ${
                  m.role === "user" ? "items-center" : "items-start"
                }`}
              >
                <div className="">
                  {m.role !== "user" ? (
                    <FontAwesomeIcon
                      icon={faRobot}
                      className={`text-white mt-4`}
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="text-white" />
                  )}
                </div>
                <div
                  key={index}
                  className={`p-4 shadow-md rounded-xl relative ${
                    m.role === "user"
                      ? "bg-slate-600 rounded-full"
                      : "bg-slate-800"
                  }`}
                >
                  {/* {m.content} */}
                  {m.role !== "user" ? (
                    <Markdown text={m.content} />
                  ) : (
                    m.content
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="fixed bottom-0 left-0 lg:left-60 right-0 mx-auto max-w-6xl w-full px-4 bg-background py-4">
          <form
            className="flex items-center w-full gap-4 bg-background border-2 border-slate-500 rounded-full outline-none focus:outline-none text-white px-6 py-2 h-16 lg:max-w-3xl lg:mx-auto max-[1261px]:mx-64 max-lg:mx-auto"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(e, {
                data: {
                  prompt: input,
                },
              });
            }}
          >
            <input
              type="text"
              className="flex-1 outline-none focus:outline-none bg-background"
              placeholder={`${
                isLoading ? "Generating..." : "Ask me anything..."
              }`}
              disabled={isLoading}
              value={input}
              onChange={handleInputChange}
            />
            <button type="submit" className="bg-white rounded-full px-2 py-1">
              {isLoading ? (
                <FontAwesomeIcon
                  onClick={stop}
                  icon={faStop}
                  className="text-stone-600"
                  width={16}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faArrowUp}
                  className="text-stone-600"
                  width={16}
                />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;
