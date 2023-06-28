import Project from "@src/application/project/components/project";

const ProjectPage = ({ params }: { params: { projectId: string } }) => {
  return <Project projectId={params.projectId} />;
};

export default ProjectPage;
