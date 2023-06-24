import ProjectSearch from "@src/components/header/projectSearch";
import { PrismaClient } from "database";

const prisma = new PrismaClient();

const ProjectList = async () => {
  const projects = await prisma.project.findMany();

  return <ProjectSearch projects={projects} />;
};

export default ProjectList;
