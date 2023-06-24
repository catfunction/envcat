import ProjectList from "@src/components/header/projectList";
import ProjectSwitcher from "@src/components/header/projectSwitcher";
import User from "@src/components/header/user";
import { Input } from "@src/components/ui/input";
import { Cat } from "lucide-react";
import { Metadata } from "next";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col">
      <div className="border-b py-3 px-4 flex justify-between items-center">
        <div className="flex gap-4 items-center">
          <h1 className="text-lg font-semibold flex flex-row gap-1 items-center">
            <Cat size={30} /> ENVCAT
          </h1>
          <ProjectSwitcher>
            <ProjectList />
          </ProjectSwitcher>
        </div>
        <div className="flex items-center gap-4">
          <Input
            type="search"
            placeholder="Search..."
            className="md:w-[100px] lg:w-[300px]"
          />
          <User />
        </div>
      </div>
      <div className="px-8 pt-6">{children}</div>
    </div>
  );
};

export const metadata: Metadata = {
  title: "EnvCat",
};

export default DefaultLayout;
