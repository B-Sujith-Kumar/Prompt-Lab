"use client";
import { addComment } from "@/lib/actions/prompts.actions";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";


const Comments = ({ userData, prompt, photo, userId }: any) => {
  const [comment, setComment] = useState("");
  const handleSubmit = async () => {
    if (!comment) return;
    const res = await addComment({ promptId: prompt._id, comment , userId });
    if (res) {
      setComment("");
    }
    
  }
  return (
    <div className="flex mt-8 [816px]:items-center gap-8 justify-between max-[816px]:flex-col">
      <div className="flex w-full items-center gap-8 max-[816px]:gap-4 max-[816px]:w-full">
        <Link
          href={`/user/${prompt.author._id}`}
          className="flex gap-3 items-center"
        >
          <Image
            src={photo}
            width={60}
            height={60}
            alt="profile pic"
            className="rounded-full mb-5"
          />
        </Link>
        <div className="w-full">
          <input
            type="text"
            className="w-full bg-background border-2 border-t-0 border-x-0 border-b-slate-600 flex-1 mb-2 outline-none focus:outline-none py-1"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <button className={`bg-btn-primary py-1 px-4 rounded-full font-medium ${!comment ? 'cursor-not-allowed' : ''}`} disabled={!comment}
            onClick={handleSubmit}>
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comments;
