"use client";
import React from "react";
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
import { deleteCollectionAndPrompts } from "@/lib/actions/user.actions";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/components/ui/use-toast";

const DeleteCollection = ({ collectionId }: { collectionId: string }) => {
  const router = useRouter();
  const { toast } = useToast();
  const handleDelete = async () => {
    try {
      await deleteCollectionAndPrompts(collectionId);
      router.push("/prompt/create");
      toast({
        title: "Collection deleted",
        description: "Collection has been successfully deleted.",
        color: "white"
      });
    } catch (error) {
      console.error("Error deleting collection:", error);
    }
  };
  return (
    <div>
      <AlertDialog>
        <AlertDialogTrigger className="flex items-center font-worksans font-medium gap-2 bg-red-500 px-2 py-2 rounded-lg">
          <FontAwesomeIcon icon={faTrash} />
          Delete Collection
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="text-white font-worksans">
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              collections and prompts from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="text-white font-worksans">
            <AlertDialogCancel className="border-0">Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-btn-primary border-0"
              onClick={handleDelete}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DeleteCollection;
