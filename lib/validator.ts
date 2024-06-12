// import * as z from "zod";

// export const promptFormSchema = z.object({
//     title: z.string().min(3, "Title must be at least 3 characters"),
//     description: z.string().min(3, "Description must be at least 3 characters"),
//     content: z.string().min(3, "Content must be at least 3 characters"),
//     thumbnail: z.string(),
//     platform: z.array(z.string()).nonempty("Platform must have at least one value"),
//     tags: z.array(z.string()).nonempty("Add a tag"),
//     collection: z.string().nonempty("Add a collection"),
// });

import * as z from "zod";

export const promptFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(3, "Description must be at least 3 characters"),
  content: z.string().min(3, "Content must be at least 3 characters"),
  thumbnail: z.string(),
//   platform: z.array(z.string()).min(1, "Select a platform"),
  tags: z.array(z.string()).optional(),
  collection: z.string().nonempty("Add a collection"),
});
