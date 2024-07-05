"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import hamburger from "../../../public/icons/hamburger.svg";
import close from "../../../public/icons/close.svg";
import { usePathname } from "next/navigation";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "../../../app/globals.css"

const Header = () => {
  const links = [
    {
      title: "Home",
      href: "/",
    },
    {
      title: "About",
      href: "/about",
    },
    {
      title: "My Profile",
      href: "/profile",
    },
    {
        title: "Search",
        href: "/all-prompts",
    },
    {
      title: "Go to Workspace",
      href: "/prompt/create",
    },
  ];
  const pathName = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header>
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-around bg-background text-white py-6 items-center navbar-glow max-lg:justify-between max-lg:px-9 max-lg:py-7">
        <div className="font-semibold text-2xl font-montserrat tracking-wide">
          <Link href="/">PromptLab</Link>
        </div>
        <div className="flex gap-x-8 font-worksans text-lg max-lg:hidden">
          {links.map(
            (link, i) =>
              i < 4 && (
                <Link
                  href={link.href}
                  key={link.title}
                  className={`font-normal ${
                    pathName == link.href
                      ? "text-btn-primary bg-white px-3 py-1 rounded-full"
                      : "px-3 py-1"
                  }`}
                >
                  {link.title}
                </Link>
              )
          )}
        </div>
        <div className="font-worksans flex gap-x-6 items-center max-lg:hidden">
          {links.map(
            (link, i) =>
              i >= 4 && (
                <Link
                  href={link.href}
                  key={link.title}
                  className="text-md font-medium bg-btn-primary border-[1px] border-btn-primary px-7 py-2 rounded-md"
                >
                  {link.title}
                </Link>
              )
          )}
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Link href="/sign-in" className="login-btn">
              Login
            </Link>
          </SignedOut>
        </div>
        {!isOpen ? (
          <div className="lg:hidden flex gap-8">
            <SignedIn>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
            <Image
              src={hamburger}
              width={24}
              height={24}
              className="cursor-pointer"
              alt="hamburger menu"
              onClick={() => setIsOpen(true)}
            />
          </div>
        ) : (
          <div className="lg:hidden">
            <Image
              src={close}
              width={23}
              height={23}
              className="cursor-pointer"
              alt="close menu"
              onClick={() => setIsOpen(false)}
            />
          </div>
        )}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } lg:hidden fixed min-h-screen bg-img bg-background z-50 w-full top-0 left-0 px-7 bg-img`}
        >
          {/* <div className="gradient -z-10"></div> */}
          <div className="flex justify-between pt-10">
            <h1 className="font-semibold text-2xl font-montserrat tracking-wide">
              PromptLab
            </h1>
            <Image
              src={close}
              width={23}
              height={23}
              alt="close menu"
              className="cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>
          <div className="flex flex-col mt-6 font-worksans">
            {links.map(
              (link, i) =>
                i < 4 && (
                  <Link
                    href={link.href}
                    key={link.title}
                    className={`font-medium text-xl py-8 border-b-[0.5px] border-slate-400`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.title}
                  </Link>
                )
            )}
            <div className="font-worksans flex gap-x-6 items-center mt-10 max-sm:flex-col max-sm:gap-y-8">
              {links.map(
                (link, i) =>
                  i >= 4 && (
                    <Link
                      href={link.href}
                      key={link.title}
                      className="text-lg font-medium bg-btn-primary border-[1px] border-btn-primary px-7 py-2 rounded-md max-sm:w-full max-sm:text-center max-sm:py-3"
                      onClick={() => setIsOpen(false)}
                    >
                      {link.title}
                    </Link>
                  )
              )}
              <SignedOut>
                <Link
                  href="/sign-in"
                  className="login-btn text-lg  max-sm:w-full max-sm:text-center max-sm:py-3"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
              </SignedOut>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
