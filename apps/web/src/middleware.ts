import withAuth from "next-auth/middleware";

export const config = {
  matcher: ["/((?!signin|welcome).*)"],
  pages: {
    signIn: "/signin",
  },
};

export 	default withAuth({
  cookies: {
    sessionToken: {
      name: "ENVCAT_TOKEN",
    },
  },
});
