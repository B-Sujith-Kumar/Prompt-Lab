import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PromptLab",
  description: "A platform to share and publish prompts.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{}}>
      <html lang="en">
        <body className="bg-background">
          <main>{children}</main>
          <div className="text-white">
            <Toaster />
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
