import { readFileSync } from "fs";

const getEnvFile = () => {
  return readFileSync(`.env`, {
    encoding: "utf-8",
  });
};

export default getEnvFile;
