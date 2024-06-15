"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { aiLogos } from "@/lib/exports";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { promptFormSchema } from "@/lib/validator";
import FileUploader from "../PromptCreation/FileUploader";
import { useState } from "react";
import Dropdown from "../PromptCreation/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import {useUploadThing} from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createPrompt } from "@/lib/actions/prompts.actions";

type PromptForm = {
  userId: string;
  type: "Create";
};
const PromptForm = ({ userId, type }: PromptForm) => {
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagValue, setTagValue] = useState("");
  const [tagError, setTagError] = useState("");
  const [platformError, setPlatformError] = useState("");
  const [selectedCollection, setSelectedCollection] = useState<string>("");
  const {startUpload} = useUploadThing("imageUploader")
  const router = useRouter();
  const addTag = (newTag: string) => {
    if (newTag.trim() && !tags.includes(newTag)) {
      setTags([...tags, newTag.trim()]);
      setTagValue("");
    }
  };
  const togglePlatform = (platform: string) => {
    setSelectedPlatforms((prev) =>
      prev.includes(platform)
        ? prev.filter((p) => p !== platform)
        : [...prev, platform]
    );
  };
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = {
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    collection: "",
  };
  const form = useForm<z.infer<typeof promptFormSchema>>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: initialValues,
  });

  async function onSubmit(values: z.infer<typeof promptFormSchema>) {
    if (tags.length === 0) {
      setTagError("Add a tag");
      return;
    }
    if (selectedPlatforms.length === 0) {
      setPlatformError("Select a platform");
      return;
    }
    setTagError("");
    setPlatformError("");
    const newForm = {
      ...values,
      tags,
      platforms: selectedPlatforms,
      collection: selectedCollection,
    };
    console.log(newForm);
    let uploadedImageUrl = newForm.thumbnail;
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        return;
      }
      uploadedImageUrl = uploadedImages[0].url;

    }
    try {
        const newPrompt = await createPrompt({
            prompt: {...newForm, thumbnail: uploadedImageUrl},
            userId,
            path: "/profile"
        })
        if (newPrompt) {
            form.reset();
            router.push(`/prompt/${newPrompt._id}`)
        }
    } catch (error) {
        console.log(error);
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-8 px-3 pb-8 text-white font-worksans"
      >
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col py-2">
                <FormLabel className="text-xl max-sm:text-lg mb-2">
                  Title of the prompt
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Title of the prompt ..."
                    {...field}
                    className="rounded-full focus-visible:ring-transparent border-slate-400 py-3 px-4 text-lg max-sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-500 pt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col py-2">
                <FormLabel className="text-xl max-sm:text-lg mb-2">
                  Content of the prompt
                </FormLabel>
                <FormControl className="">
                  <Input
                    placeholder="Content of the prompt ..."
                    {...field}
                    className="rounded-full focus-visible:ring-transparent border-slate-400 py-3 px-4 text-lg max-sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-500 pt-2" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col md:flex-row gap-5">
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col py-2">
                <FormLabel className="text-xl max-sm:text-lg mb-2">
                  Description of the prompt
                </FormLabel>
                <FormControl className="">
                  <Textarea
                    placeholder="What is your prompt about? ..."
                    {...field}
                    className="rounded-2xl focus-visible:ring-transparent border-slate-400 py-3 px-4 text-lg max-sm:text-base"
                    rows={8}
                  />
                </FormControl>
                <FormMessage className="text-red-500 pt-2" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="thumbnail"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col py-2">
                <FormLabel className="text-xl max-sm:text-lg mb-2">
                  Upload a thumbnail
                </FormLabel>
                <FormControl className="">
                  <FileUploader
                    onFieldChange={field.onChange}
                    imageUrl={field.value}
                    setFiles={setFiles}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:gap-10">
          <FormField
            control={form.control}
            name="collection"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col py-2">
                <FormLabel className="text-xl max-sm:text-lg mb-2">
                  Select a collection
                </FormLabel>
                <FormControl>
                  <Dropdown
                    onChangeHandler={(value) => {
                      field.onChange(value);
                      setSelectedCollection(value);
                    }}
                    value={field.value}
                    setSelectedCollection={setSelectedCollection}
                  />
                </FormControl>
                <FormMessage className="text-red-500 pt-2" />
              </FormItem>
            )}
          />
          <div className="w-full">
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col py-2">
                  <FormLabel className="text-xl max-sm:text-lg mb-2">
                    Add tags
                  </FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        placeholder="Add a tag"
                        {...field}
                        className="rounded-full h-[43px] focus-visible:ring-transparent border-slate-400 py-3 px-4 text-lg max-sm:text-base"
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                      />
                      <div className="">
                        <Button
                          type="button"
                          className="text-base bg-btn-primary rounded-full py-3 h-[43px]"
                          onClick={() => {
                            addTag(tagValue);
                            setTagError("");
                          }}
                        >
                          Add Tag
                        </Button>
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage className="text-red-500 pt-2" />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-2 mt-2 font-worksans">
              {tags.map((tag, id) => (
                <div
                  key={id}
                  className="bg-background border-[0.8px] border-slate-500 text-white text-lg px-4 py-2 rounded-full flex items-center justify-between gap-2 hover:bg-btn-primary hover:text-white transition-colors duration-300 ease-in-out hover:cursor-pointer"
                >
                  <span className="text-base">{tag}</span>
                  <FontAwesomeIcon
                    icon={faCircleXmark}
                    className="cursor-pointer"
                    onClick={() => {
                      setTags(tags.filter((t) => t !== tag));
                    }}
                  />
                </div>
              ))}
              {tagError && <p className="text-red-500 text-base">{tagError}</p>}
            </div>
            {/* <div className="pb-3">
              <Button
                type="button"
                className="text-base bg-btn-primary rounded-full"
              >
                Add Tag
              </Button>
            </div> */}
          </div>
        </div>
        <div>
          <FormDescription className="text-xl max-sm:text-lg font-medium">
            Select one or more platforms
          </FormDescription>
          <div className="grid grid-cols-6 gap-8 mt-8 max-[1220px]:grid-cols-4 max-lg:grid-cols-4 max-md:grid-cols-3 max-[560px]:grid-cols-2 max-[390px]:grid-cols-2">
            {aiLogos.map((platform, id) => (
              <div
                key={id}
                className={`cursor-pointer max-w- py-6 border-2 rounded ${
                  selectedPlatforms.includes(platform.alt)
                    ? "border-blue-500 scale-95"
                    : "border-gray-600"
                }  opacity-95 rounded-xl  hover:scale-105 transition-transform duration-300 ease-in-out active:scale-95 px-2 `}
                onClick={() => togglePlatform(platform.alt)}
              >
                <Image
                  src={platform.src}
                  alt={platform.alt}
                  className="h-16 w-16 mx-auto bg-white rounded-full "
                />
                <p className="text-center mt-2 font-medium">{platform.alt}</p>
              </div>
            ))}
          </div>
          {platformError && (
            <p className="text-red-500 text-base mt-4">{platformError}</p>
          )}
        </div>

        <div className="flex md:items-center md:justify-center">
          <Button
            type="submit"
            className="max-md:w-full text-lg  text-center bg-btn-primary"
          >
            {form.formState.isSubmitting ? (
            'Submitting...'
          ): `Upload Prompt`}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromptForm;
