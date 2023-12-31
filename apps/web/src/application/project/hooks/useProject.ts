import { prisma } from "database";

const useProject = (id: string) => {
  return prisma.project.findUnique({
    where: { id },
    include: { environments: { include: { variables: true } } },
  });
};

export default useProject;
