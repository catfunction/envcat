import { projectWithEnvironments } from "@src/application/project/types";

const getDataFromProject = (project: projectWithEnvironments) => {
  const variables = project.environments.flatMap(
    (environment) => environment.variables,
  );

  return variables.map((variable) => {
    return {
      variable: variable.name,
      ...project.environments.reduce((acc, environment) => {
        acc[environment.name] = environment.variables.find((envVar) => {
          return envVar.id === variable.id;
        })?.value;
        return acc;
      }, {}),
    };
  });
};

export default getDataFromProject;
