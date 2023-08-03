import fetchClient from "@src/shared/fetchClient";

class GetProject {
  constructor(private readonly client: typeof fetchClient) {}

  public execute({ id }: { id: string }) {
    return this.client({ path: `/projects/${id}` });
  }
}

const getProject = new GetProject(fetchClient);

export default getProject;
