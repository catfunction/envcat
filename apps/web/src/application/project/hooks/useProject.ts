import { PrismaClient } from "database";

const prisma = new PrismaClient();

const useProject = (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: { environment: { include: { variables: true } } },
  });
};

export default useProject;
