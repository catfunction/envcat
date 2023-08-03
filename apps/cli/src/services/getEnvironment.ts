import fetchClient from "@src/shared/fetchClient";
import { Environment, Variable } from "database";

class GetEnvironment {
  constructor(private readonly client: typeof fetchClient) {}

  public execute({
    id,
  }: {
    id: string;
  }): Promise<Environment & { variables: Variable[] }> {
    return this.client({
      path: `/environments/${id}`,
    });
  }
}

const getEnvironment = new GetEnvironment(fetchClient);

export default getEnvironment;
