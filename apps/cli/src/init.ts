import { select } from "@inquirer/prompts";
import variablesTable from "@src/components/variablesTable";
import getEnvironment from "@src/services/getEnvironment";
import getProjects from "@src/services/getProjects";
import { Project, Environment } from "database";

const init = async () => {
  const projects = await getProjects();

  const projectSelected = await select<
    Project & { environments: Environment[] }
  >({
    message: "Select project to sync",
    choices: projects.map((project: Project) => ({
      name: project.name,
      value: project,
    })),
  });

  const environmentSelected = await select<Environment>({
    message: "Select environment to sync variables",
    choices: projectSelected.environments.map((environment: Environment) => ({
      name: environment.name,
      value: environment,
    })),
  });

  const environment = await getEnvironment({ id: environmentSelected.id });

  variablesTable({
    environmentName: environment.name,
    variables: environment.variables,
  });
};

export default init;
