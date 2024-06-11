"use client";

import { useCallback, Dispatch, SetStateAction } from "react";
// import type { FileWithPath } from "@uploadthing/react";
import { FileWithPath } from 'react-dropzone'
import { useDropzone } from "@uploadthing/react/hooks";
import { generateClientDropzoneAccept } from "uploadthing/client";

import { Button } from "@/components/ui/button";
import { convertFileToUrl } from "@/lib/utils";
import dropImg from "@/public/icons/upload.svg"

type fileUploadProps = {
  onFieldChange: (value: string) => void;
  imageUrl: string;
  setFiles: Dispatch<SetStateAction<File[]>>;
};

// Note: `useUploadThing` is IMPORTED FROM YOUR CODEBASE using the `generateReactHelpers` function

export function FileUploader({
  imageUrl,
  onFieldChange,
  setFiles,
}: fileUploadProps) {
  const onDrop = useCallback((acceptedFiles: FileWithPath[]) => {
    setFiles(acceptedFiles);
    onFieldChange(convertFileToUrl(acceptedFiles[0]));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*" ? generateClientDropzoneAccept(["image/*"]) : undefined,
  });

  return (
    <div
      {...getRootProps()}
      className={`flex-center items-center bg-dark-3 flex h-68 cursor-pointer flex-col overflow-hidden rounded-xl ${imageUrl ? "bg-none" : "bg-gray-800"}`}
    >
      <input {...getInputProps()} className="cursor-pointer" />

      {imageUrl ? (
        <div className="flex h-full w-full flex-1 justify-center ">
          <img
            src={imageUrl}
            alt="image"
            width={250}
            height={250}
            // className="w-full object-cover object-center"
            className="h-[250px] w-[250px] rounded-xl object-cover object-center"
            
          />
        </div>
      ) : (
        <div className="flex-center flex items-center flex-col py-7 text-grey-500">
          <img
            src="/icons/upload.svg"
            width={77}
            height={77}
            alt="file upload"
          />
          <h3 className="mb-2 mt-2 text-slate-300">Drag & drop photo here</h3>
          <p className="p-medium-12 mb-4 text-slate-300">SVG, PNG, JPG</p>
          <Button type="button" className="rounded-full px-3 bg-btn-primary">
            Select from device
          </Button>
        </div>
      )}
    </div>
  );
}

export default FileUploader;