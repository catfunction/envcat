import fetchClient from "@src/shared/fetchClient";

class FindEnvironment {
  constructor(private readonly client: typeof fetchClient) {}

  public execute({ name }: { name: string }) {
    return this.client({
      path: `/environments/find/${name}`,
    });
  }
}

const findEnvironment = new FindEnvironment(fetchClient);

export default findEnvironment;
