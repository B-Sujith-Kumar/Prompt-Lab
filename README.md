# 🤖 PromptLab

Welcome to **PromptLab**, a platform where users can share AI prompts with each other. Enhance your AI experience by creating, sharing, and discovering prompts tailored for various AI platforms.

## 🌟 Features

- **User Authentication**: Create an account using email or sign in through Google or GitHub.
- **Prompt Management**: Users can create, publish, and upload prompts with thumbnails, tags, and associated platforms such as ChatGPT, Stable Diffusion, Midjourney, Bard, Notion AI, and Leonardo AI.
- **Collections**: Organize prompts by selecting or creating collections, and save prompts from other users.
- **Interactive Features**: Like prompts, leave comments, and follow other users.
- **Notifications**: Receive email notifications when a followed user uploads a new prompt. Users can choose to turn off notifications for specific users.
- **Ask AI**: Integrated Google's Gemini API using Vercel's AI SDK to allow users to ask questions or interact with AI.
- **Search and Filter**: Search and filter prompts based on title, tags, and platforms.
- **Pagination**: Implemented pagination for prompts on the home screen and user profiles.
- **Related Prompts**: View related prompts under each prompt and explore all prompts under a specific tag by clicking on it.

## 🛠️ Technologies Utilized

- **Next.js**: A powerful React framework for server-rendered applications.
- **Clerk**: Comprehensive user management platform for secure authentication and session management.
- **MongoDB**: A NoSQL database for storing user information and prompts.
- **Mongoose**: An object modeling tool for MongoDB, designed to work seamlessly in asynchronous environments.
- **Tailwind CSS**: A utility-first CSS framework for styling.
- **Uploadthing**: Used for uploading and managing thumbnails.
- **Google Gemini**: Integrated AI capabilities via Vercel's AI SDK.
- **Vercel AI SDK**: Used to integrate and manage AI functionalities.
- **Nodemailer**: For sending email notifications.

## 📝 Getting Started

To run PromptLab locally, follow these instructions:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/B-Sujith-Kumar/prompt-lab.git
   ```
2. **Navigate to the directory**: `cd prompt-lab`
3. **Install dependencies**: `npm install`
4. **Set up environment variables** as follows:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=""
CLERK_SECRET_KEY=""
NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
MONGODB_URI=""
WEBHOOK_SECRET=""
UPLOADTHING_SECRET=""
UPLOADTHING_APP_ID=""
EMAIL_PASS=""
EMAIL_USER=""
NEXT_PUBLIC_HOST_URL_LOCAL=""
NEXT_PUBLIC_HOST_URL=
NEXT_PUBLIC_GEMINI_API_KEY=
```
5. Start the development server:
   ```bash
   npm run dev
   ```
## 🤝 Contributing

Contributions are welcome! Please follow these steps to contribute:

1. Fork the repository
2. Create a new branch (git checkout -b feature/YourFeature)
3. Commit your changes (git commit -m 'Add some feature')
4. Push to the branch (git push origin feature/YourFeature)
5. Open a pull request

## 👉 Contact

For any inquiries or feedback, please reach out to:
- **Name**: Banda Sujith Kumar
- **Email**: sujith.suave@gmail.com
- **GitHub**: [B-Sujith-Kumar](https://github.com/B-Sujith-Kumar)
