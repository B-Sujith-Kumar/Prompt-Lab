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

export type createPromptParams = {
  prompt: string;
  userId: string;
  path: string;
}