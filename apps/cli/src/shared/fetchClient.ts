import { readFileSync } from "fs";

const configFile = JSON.parse(
  readFileSync(`./envcat.json`, {
    encoding: "utf-8",
  }),
);
const serverUrl = `${configFile.server}/api`;

const fetchClient = async ({ path }: { path: string }) => {
  try {
    const response = await fetch(`${serverUrl}${path}`);

    return await response.json();
  } catch (e: unknown) {
    console.error(`${e.message}, is server running at ${configFile.server}?`);
    process.exit(1);
  }
};

export default fetchClient;
