import fetchClient from "@src/shared/fetchClient";

const getProjects = () => {
  return fetchClient({ path: "/projects" });
};

export default getProjects;
