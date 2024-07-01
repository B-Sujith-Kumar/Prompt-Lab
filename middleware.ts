import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/prompts/:id",
    "/api/uploadthing",
    "/api/webhook/clerk",
    "/contact-us",
    "/about",
  ],
  ignoredRoutes: ["/api/uploadthing", "/api/webhook/clerk", "/api/mail"],
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
