import useProject from "@src/application/project/hooks/useProject";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ projectId: string }> },
) {
  const { projectId } = (await context.params);
  const projects = await useProject(projectId);

  return NextResponse.json(projects);
}
