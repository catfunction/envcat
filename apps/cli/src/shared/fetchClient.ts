import getConfigFile from "@src/shared/getConfigFile";

try {
  const configFile = getConfigFile();

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
