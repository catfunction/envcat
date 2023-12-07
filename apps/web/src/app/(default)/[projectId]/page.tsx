import Project from "@src/application/project/components/project";
import type { Metadata } from "next";
import useProject from "@src/application/project/hooks/useProject";

const ProjectPage = ({ params }: { params: { projectId: string } }) => {
  return <Project projectId={params.projectId} />;
};

export async function generateMetadata({
  params,
}: {
  params: { projectId: string };
}): Promise<Metadata> {
  const project = await useProject(params.projectId);

  return {
    title: `EnvCat | ${project.name}`,
  };
}

export default ProjectPage;
