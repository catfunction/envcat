import useProjects from "@src/application/dashboard/hooks/useProjects";
import { NextResponse } from "next/server";

export async function GET() {
  const projects = await useProjects({ includeVariables: false });

  return NextResponse.json(projects);
}
