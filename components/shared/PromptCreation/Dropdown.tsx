import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { startTransition, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  createCollection,
  fetchAuthorCollections,
} from "@/lib/actions/collection.actions";

type DropdownProps = {
  value?: string;
  onChangeHandler: (value: string) => void;
  setSelectedCollection: (value: string) => void;
};

type CollectionProps = {
  _id: string;
  name: string;
  prompts: string[];
  author: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

const Dropdown = ({
  value,
  onChangeHandler,
  setSelectedCollection,
}: DropdownProps) => {
  const [collection, setCollection] = useState<CollectionProps[]>([]);
  const [collectionInput, setNewCollection] = useState<string>("");

  const handleAddCollection = () => {
    createCollection({
      collectionName: collectionInput.trim(),
    }).then((newCollection) => {
      setCollection((prevState) => [...prevState, newCollection]);
    });
  };

  useEffect(() => {
    const getCollections = async () => {
      const collectionsList = await fetchAuthorCollections();
      collectionsList && setCollection(collectionsList);
    };
    getCollections();
  }, []);

  return (
    <Select onValueChange={onChangeHandler} value={value}>
      <SelectTrigger className="w-full bg-grey-50 border-slate-400 h-[43px] placeholder:text-grey-500 rounded-full p-regular-16 px-5 py-3 focus-visible:ring-transparent focus:ring-transparent text-lg">
        <SelectValue
          placeholder="Pick a collection"
          className="text-slate-600"
        />
      </SelectTrigger>
      <SelectContent className="bg-background text-white border-[0.3px] border-slate-300 mt-1 p-2">
        {collection.length > 0 ? (
          collection.map((item) => (
            <SelectItem
              key={item._id}
              value={item._id}
              className="py-3 cursor-pointer hover:bg-gray-600 text-base rounded-md font-normal leading-[20px]"
            >
              {item.name}
            </SelectItem>
          ))
        ) : (
          <p className="font-worksans px-4 py-2 ">
            No collections found. Create One
          </p>
        )}
        <AlertDialog>
          <AlertDialogTrigger className="font-worksans mt-2 text-center w-full bg-btn-primary rounded-lg py-2">
            Add a collection
          </AlertDialogTrigger>
          <AlertDialogContent className="text-white rounded-xl border-[0.5px] border-gray-400">
            <AlertDialogHeader>
              <AlertDialogTitle className="mb-2 font-worksans">
                New Collection
              </AlertDialogTitle>
              <Input
                type="text"
                placeholder="Collection name"
                className="mt-2 focus:outline-none font-worksans active:outline-none focus:ring-0 active:ring-0"
                onChange={(e) => setNewCollection(e.target.value)}
              />
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="border-0">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="bg-btn-primary"
                onClick={() => startTransition(handleAddCollection)}
              >
                Add collection
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
