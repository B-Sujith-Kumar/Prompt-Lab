export type createUserParams = {
  clerkId: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  username: string;
  photo: string;
};

export type Prompt = {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  collection: string;
  tags: string[];
  platforms: string[];
};

export type userId = {
  userId: string;
};

export type createPromptParams = {
  prompt: Prompt;
  userId: string;
  path: string;
};
