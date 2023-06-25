import { PrismaClient } from "database";

const prisma = new PrismaClient();

const hasAdminUser = async () => {
  return (await prisma.user.count({ where: { role: { name: "ADMIN" } } })) > 0;
};

export default hasAdminUser;
