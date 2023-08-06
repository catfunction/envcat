import ProjectSearch from "@src/components/header/projectSearch";
import { prisma } from "database";

const ProjectList = async () => {
  const projects = await prisma.project.findMany();

  return <ProjectSearch projects={projects} />;
};

export default ProjectList;
