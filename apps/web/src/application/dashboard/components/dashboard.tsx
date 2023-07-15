import Search from "@src/application/dashboard/components/search";
import useProjects from "@src/application/dashboard/hooks/useProjects";
import { projectWithEnvironments } from "@src/application/project/types";
import CreateProjectDialog from "@src/components/createProject/createProjectDialog";
import { Button } from "@src/components/ui/button";
import { Card, CardHeader, CardTitle } from "@src/components/ui/card";
import { File, Folder } from "lucide-react";
import Link from "next/link";

const Dashboard = async ({ search }: { search: string }) => {
  const projects = await useProjects({ search });

  const renderProject = (project: projectWithEnvironments) => {
    const variablesCount = project.environments.reduce((total, environment) => {
      return total + environment.variables.length;
    }, 0);

    return (
      <Link href={`/${project.id}`}>
        <Card className="hover:bg-slate-100 cursor-pointer">
          <CardHeader>
            <CardTitle className="text-md flex flex-row justify-between">
              <div className="flex flex-col font-medium">
                {project.name}
                <span className="text-xs font-normal">v2590992</span>
              </div>
              <div className="flex flex-row gap-3 items-center">
                <div className="flex flex-row gap-1 font-medium items-center">
                  <File size={20} />
                  {variablesCount}
                </div>
                <div className="flex flex-row gap-1 font-medium items-center">
                  <Folder size={20} />
                  {project.environments.length}
                </div>
              </div>
            </CardTitle>
          </CardHeader>
        </Card>
      </Link>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row justify-between">
        <Search />
        <CreateProjectDialog>
          <Button className="flex gap-2">
            <Folder />
            Create project
          </Button>
        </CreateProjectDialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {projects.map(renderProject)}
      </div>
    </div>
  );
};

export default Dashboard;
