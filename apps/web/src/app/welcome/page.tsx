import Welcome from "@src/application/welcome/components/welcome";
import { Metadata } from "next";

const WelcomePage = () => {
  return <Welcome />;
};

export const metadata: Metadata = {
  title: "EnvCat | Welcome",
};

export default WelcomePage;
