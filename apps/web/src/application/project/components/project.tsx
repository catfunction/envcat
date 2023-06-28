import { FolderX } from "lucide-react";
import useProject from "@src/application/project/hooks/useProject";
import { Card, CardContent } from "@src/components/ui/card";
import CreateEnvironment from "@src/application/project/components/createEnvironment";
import VariablesTable from "@src/application/project/components/variablesTable";

const Project = async ({ projectId }) => {
  const project = await useProject(projectId);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-2xl">{project.name}</h2>
        <CreateEnvironment projectId={projectId} />
      </div>

      {project.environments.length === 0 && (
        <Card className="pb-4 pt-8">
          <CardContent>
            <div className="text-center flex flex-col items-center gap-2">
              <FolderX size={48} />
              <span className="font-semibold">No environments</span>
            </div>
          </CardContent>
        </Card>
      )}
      {project.environments.length > 0 && <VariablesTable project={project} />}
    </div>
  );
};

export default Project;
