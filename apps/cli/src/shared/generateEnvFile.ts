import { writeFileSync } from "fs";
import { Variable } from "database";

const generateEnvFile = (variables: Variable[]) => {
  const envVariables =
    variables && variables.length > 0
      ? variables.reduce((parsed, { name, value }) => {
          parsed += `${name.toUpperCase()}="${value}"\n`;
          return parsed;
        }, "")
      : "";

  writeFileSync(".env", envVariables, "utf8");
};

export default generateEnvFile;
