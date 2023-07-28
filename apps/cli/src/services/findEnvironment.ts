import fetchClient from "@src/shared/fetchClient";

const findEnvironment = ({ name }: { name: string }) => {
  return fetchClient({
    path: `/environment/find/${name}`,
  });
};

export default findEnvironment;
