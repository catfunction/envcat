import { PrismaClient } from "database";

const prisma = new PrismaClient();

const useProjects = ({
  search,
  includeVariables = true,
}: {
  search?: string;
  includeVariables?: boolean;
}) => {
  return prisma.project.findMany({
    where: search ? { name: { contains: search } } : {},
    include: {
      environments: includeVariables ? { include: { variables: true } } : {},
    },
  });
};

export default useProjects;
