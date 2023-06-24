import Project from "@src/application/project/components/project";

const ProjectPage = ({ params }: { params: { id: string } }) => {
  return <Project id={params.id} />;
};

export default ProjectPage;
