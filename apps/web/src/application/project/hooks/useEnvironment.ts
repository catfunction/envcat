import { prisma } from "database";

const useEnvironment = (id: string) => {
  return prisma.environment.findUnique({
    where: { id },
    include: { variables: true },
  });
};

export default useEnvironment;
