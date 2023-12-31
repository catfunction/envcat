import useEnvironment from "@src/application/project/hooks/useEnvironment";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: { environmentId: string } },
) {
  const { environmentId } = context.params;

  const environment = await useEnvironment(environmentId);

  return NextResponse.json(environment);
}
