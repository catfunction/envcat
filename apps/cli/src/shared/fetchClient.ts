import { readFileSync } from "fs";

try {
  const configFile = JSON.parse(
    readFileSync(`./envcat.json`, {
      encoding: "utf-8",
    }),
  );

  globalThis.serverUrl = configFile.serverUrl;
} catch (e: unknown) {}

const fetchClient = async ({ path }: { path: string }) => {
  const serverUrl = globalThis.serverUrl;
  try {
    const response = await fetch(`${serverUrl}/api${path}`);

    return await response.json();
  } catch (e: unknown) {
    console.error(`${e.message}, is server running at ${serverUrl}?`);
    process.exit(1);
  }
};

export default fetchClient;
