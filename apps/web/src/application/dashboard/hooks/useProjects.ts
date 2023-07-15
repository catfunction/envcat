import { PrismaClient } from "database";

const prisma = new PrismaClient();

const useProjects = ({ search }: { search: string }) => {
  return prisma.project.findMany({
    where: search ? { name: { contains: search } } : {},
    include: { environments: { include: { variables: true } } },
  });
};

export default useProjects;
