import { PrismaClient } from "database";

const prisma = new PrismaClient();

const useEnvironment = (id: string) => {
  return prisma.environment.findUnique({
    where: { id },
    include: { variables: true },
  });
};

export default useEnvironment;
