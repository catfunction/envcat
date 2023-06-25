export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/((?!signin|welcome).*)"],
  pages: {
    signIn: "/signin",
  },
};
