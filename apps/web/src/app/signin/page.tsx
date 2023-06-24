import SignIn from "@src/application/signIn";
import { Metadata } from "next";

const SignInPage = () => {
  return <SignIn />;
};

export const metadata: Metadata = {
  title: "EnvCat | Sign In",
};

export default SignInPage;
