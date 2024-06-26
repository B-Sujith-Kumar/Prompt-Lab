"use client";

import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { deleteComment } from "@/lib/actions/prompts.actions"; // Ensure correct import path

const DisplayComments = async ({ comments, promptId }: any) => {
  const [commentList, setCommentList] = useState(comments);

  const handleDeleteComment = async (commentId: any) => {
    try {
      const response = await deleteComment({ commentId, promptId });
      if (response?.success) {
        setCommentList(
          commentList.filter((comment: any) => comment._id !== commentId)
        );
      } else {
        console.error("Failed to delete comment:", response?.message);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    commentList &&
    commentList.map((comment: any) => (
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
          {/* <DropdownMenu>
            <DropdownMenuTrigger className="hover:cursor-pointer">
              <FontAwesomeIcon icon={faEllipsisVertical} />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="text-white font-worksans bg-background px-2 py-2">
              <DropdownMenuItem
                className="hover:cursor-pointer hover:bg-gray-500"
              >
                <button onClick={() => handleDeleteComment(comment._id)}>Delete</button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
        </div>
      </div>
    ))
  );
};

export default DisplayComments;
