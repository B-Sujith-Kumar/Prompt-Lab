export type createUserParams = {
  clerkId: string;
  username: string;
  email: string;
  photo: string;
  firstName: string;
  lastName: string;
};

export type UpdateUserParams = {
  username: string;
  photo: string;
  firstName: string;
  lastName: string;
};

export type Prompt = {
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  collection: string;
  tags: string[];
  platform: string[];
};

export type userId = {
  userId: string;
};

export type createPromptParams = {
  prompt: Prompt;
  userId: string;
  path: string;
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type GetAllPromptParams = {
  page: number;
  limit: number;
  collectionType: string;
  tag: string;
  query: string;
};

export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
    params: string
    keysToRemove: string[]
  }