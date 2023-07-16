import { writeFileSync } from "fs";
import { Variable } from "database";

const generateEnvFile = ({
  version,
  variables,
}: {
  version: string;
  variables: Variable[];
}): string => {
  const envVariables =
    variables && variables.length > 0
      ? variables.reduce((parsed, { name, value }) => {
          parsed += `${name.toUpperCase()}="${value}"\n`;
          return parsed;
        }, `#version:${version}\n`)
      : "";

  writeFileSync(".env", envVariables, "utf8");

  return envVariables;
};

export default generateEnvFile;
