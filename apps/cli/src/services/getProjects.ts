import fetchClient from "@src/shared/fetchClient";

class GetProjects {
  constructor(private readonly client: typeof fetchClient) {}

  public execute() {
    return this.client({ path: "/projects" });
  }
}

const getProjects = new GetProjects(fetchClient);

export default getProjects;
