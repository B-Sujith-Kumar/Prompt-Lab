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
import midjourney from "@/public/images/AILogo/midjourney.webp";
import { promptFormSchema } from "@/lib/validator";
import { title } from "process";

type PromptForm = {
  userId: string;
  type: "Create";
};
const PromptForm = ({ userId, type }: PromptForm) => {
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
                <FormLabel className="text-xl max-sm:text-lg mb-2">Title of the prompt</FormLabel>
                <FormControl>
                  <Input placeholder="Title of the prompt ..." {...field} className="rounded-full py-3 px-4 text-lg max-sm:text-base"/>
                </FormControl>
                <FormMessage className="text-red-500"/>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem className="w-full flex flex-col py-2">
                <FormLabel className="text-xl max-sm:text-lg mb-2">Content of the prompt</FormLabel>
                <FormControl className="">
                  <Input placeholder="Content of the prompt ..." {...field} className="rounded-full py-3 px-4 text-lg max-sm:text-base"/>
                </FormControl>
                <FormMessage className="text-red-500"/>
              </FormItem>
            )}
          />
        </div>
        <Button type="submit" className="">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PromptForm;
