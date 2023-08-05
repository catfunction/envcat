import { projectWithEnvironments } from "@src/application/project/types";

const getDataFromProject = (project: projectWithEnvironments) => {
  const variables = project.environments.flatMap(
    (environment) => environment.variables,
  );

  const groupedVariables = variables.reduce((acc, variable) => {
    const name = variable.name;
    if (!acc[name]) {
      acc[name] = variable;
    }
    return acc;
  }, {});

  return Object.keys(groupedVariables).map((variable) => {
    return {
      variable,
      ...project.environments.reduce((acc, environment) => {
        acc[environment.name] = environment.variables.find((envVar) => {
          return (
            variable === envVar.name && environment.id === envVar.environmentId
          );
        });
        return acc;
      }, {}),
    };
  });
};

export default getDataFromProject;
