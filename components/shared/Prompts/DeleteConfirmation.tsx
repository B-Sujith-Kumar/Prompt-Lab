"use client";

import { useTransition } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { deletePrompt } from "@/lib/actions/prompts.actions";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteConfirmation = ({ promptId }: { promptId: string | undefined }) => {
  const pathname = usePathname();
  let [isPending, startTransition] = useTransition();

  return (
    <AlertDialog>
      <AlertDialogTrigger className="">
        {/* <Image
          src="/assets/icons/delete.svg"
          alt="edit"
          width={20}
          height={20}
        /> */}
        <FontAwesomeIcon icon={faTrash} className="text-red-600 shadow-lg border-black bg-white p-2 absolute top-4 right-3 rounded-lg" />
      </AlertDialogTrigger>

      <AlertDialogContent className="bg-background text-white font-worksans">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
          <AlertDialogDescription className="p-regular-16 text-grey-600">
            This will permanently delete this prompt
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className="border-0">Cancel</AlertDialogCancel>

          <AlertDialogAction
          className="border-0 bg-btn-primary text-white  rounded-lg"
            onClick={() =>
              startTransition(async () => {
                await deletePrompt({ promptId, path: pathname } as {
                  promptId: string;
                  path: string;
                });
              })
            }
          >
            {isPending ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteConfirmation;
