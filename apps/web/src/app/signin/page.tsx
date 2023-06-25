import SignIn from "@src/application/signIn";
import hasAdminUser from "@src/lib/hasAdminUser";
import { Metadata } from "next";
import { redirect } from "next/navigation";

const SignInPage = async () => {
  const adminUser = await hasAdminUser();

  if (!adminUser) {
    redirect("/welcome");
  }

  return <SignIn />;
};

export const metadata: Metadata = {
  title: "EnvCat | Sign In",
};

export default SignInPage;
