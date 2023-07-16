import fetchClient from "@src/shared/fetchClient";

const getEnvironment = ({ id }: { id: string }) => {
  return fetchClient({
    path: `/environment/${id}`,
  });
};

export default getEnvironment;
