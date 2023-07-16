import { readFileSync } from "fs";

const getConfigFile = (): {
  serverUrl: string;
  projectId: string;
  environmentId: string;
} => {
  return JSON.parse(
    readFileSync(`./envcat.json`, {
      encoding: "utf-8",
    }),
  );
};

export default getConfigFile;
