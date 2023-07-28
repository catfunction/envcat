import useProject from "@src/application/project/hooks/useProject";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: { projectId: string } },
) {
  const { projectId } = context.params;
  const projects = await useProject(projectId);

  return NextResponse.json(projects);
}
