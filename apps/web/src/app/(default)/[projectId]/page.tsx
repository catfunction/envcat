import Project from "@src/application/project/components/project";
import type { Metadata } from "next";
import getProject from "@src/application/project/hooks/useProject";

const ProjectPage = async (props: { params: Promise<{ projectId: string }> }) => {
  const params = await props.params;
  return <Project projectId={params.projectId} />;
};

export async function generateMetadata(
  props: {
    params: Promise<{ projectId: string }>;
  }
): Promise<Metadata> {
  const params = await props.params;
  const project = await getProject(params.projectId);

  return {
    title: `EnvCat | ${project.name}`,
  };
}

export default ProjectPage;
