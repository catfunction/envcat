import fetchClient from "@src/shared/fetchClient";

const getProject = ({ id }: { id: string }) => {
  return fetchClient({ path: `/projects/${id}` });
};

export default getProject;
