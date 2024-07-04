"use client";

import Header from "@/components/shared/navbar/Header";
import Link from "next/link";
import React from "react";

const Error = () => {
  return (
    <div>
      <Header />
      <div className="flex pt-40 flex-col justify-center items-center gap-10 px-4">
        <h1 className=" font-montserrat text-9xl font-semibold text-white max-sm:text-8xl">
          Oops!
        </h1>
        <h3 className="font-montserrat text-white text-center text-xl uppercase font-semibold max-sm:text-lg">
          500 - Internal Server Problem
        </h3>
        <p className="font-worksans text-lg text-white text-center max-sm:text-base">
          The server encountered an internal error or misconfiguration and was
          unable to complete your request.
        </p>
        <Link
          href="/"
          className="text-white bg-btn-primary font-worksans px-4 py-2 text-lg rounded-full font-semibold"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
};

export default Error;
