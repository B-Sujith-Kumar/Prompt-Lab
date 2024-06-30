"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { deleteComment } from "@/lib/actions/prompts.actions";

const DisplayComments = ({ comments, promptId }: any) => {
  const deleteCommentRes = async (id: string) => {
    const res = await deleteComment({ commentId: id, promptId });
  };
  return (
    <div>
      {comments.map((comment: any) => (
        <div className="flex gap-4 mt-4 items-center mb-10" key={comment._id}>
          <Link href={`/user/${comment.author._id}`}>
            <Image
              src={comment.author.photo}
              width={50}
              height={50}
              alt="profile pic"
              className="rounded-full hover:cursor-pointer"
            />
          </Link>
          <div className="flex justify-between w-full">
            <div className="w-full flex flex-col gap-2">
              <Link
                href={`/user/${comment.author._id}`}
                className="text-white font-montserrat font-medium hover:cursor-pointer gap-4 text-sm"
              >
                @ {comment.author.username}
              </Link>
              <p className="text-white text-sm">{comment.content}</p>
            </div>
            <div className="text-white font-worksans">
              {/* <Popover>
                <PopoverTrigger>
                  <FontAwesomeIcon icon={faEllipsisVertical} />
                </PopoverTrigger>
                <PopoverContent className="text-white font-worksans flex flex-col justify-start items-start max-w-24 px-2 py-2 bg-background">
                  <button className="hover:bg-gray-600 w-full py-1 rounded-lg">
                    Edit
                  </button>
                  <button
                    className="hover:bg-gray-600 w-full py-1 rounded-lg"
                    onClick={() => deleteCommentRes(comment._id)}
                  >
                    Delete
                  </button>
                </PopoverContent>
              </Popover> */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DisplayComments;
