"use client";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import midjourney from "@/public/images/AILogo/midjourney.webp";
import { promptFormSchema } from "@/lib/validator";
import FileUploader from "../PromptCreation/FileUploader";
import { useState } from "react";

type PromptForm = {
  userId: string;
  type: "Create";
};
const PromptForm = ({ userId, type }: PromptForm) => {
  const [files, setFiles] = useState<File[]>([]);
  const initialValues = {
    title: "",
    description: "",
    content: "",
    thumbnail: "",
    platform: [],
    tags: [],
  };
  const form = useForm<z.infer<typeof promptFormSchema>>({
    resolver: zodResolver(promptFormSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof promptFormSchema>) {
    console.log(values);
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 mt-8 px-3 text-white font-worksans"
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
                    className="rounded-full border-slate-400 py-3 px-4 text-lg max-sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
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
                    className="rounded-full border-slate-400 py-3 px-4 text-lg max-sm:text-base"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
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
                    className="rounded-2xl border-slate-400 py-3 px-4 text-lg max-sm:text-base"
                    rows={8}
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
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
        <div className="flex md:items-center md:justify-center">
          <Button
            type="submit"
            className="max-md:w-full text-lg  text-center bg-btn-primary"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PromptForm;
