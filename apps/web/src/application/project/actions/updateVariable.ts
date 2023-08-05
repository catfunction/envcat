"use server";

import { PrismaClient } from "database";

const prisma = new PrismaClient();

const updateVariable = async ({ projectId, name, environmentName, value }) => {
  const environment = await prisma.environment.findFirst({
    where: { name: environmentName, projectId },
  });

  const variable = await prisma.variable.findFirst({
    where: { name, environmentId: environment.id },
    include: { environment: true },
  });

  if (variable) {
    return prisma.variable.update({
      where: { id: variable.id },
      data: {
        value,
      },
    });
  }

  return prisma.variable.create({
    data: {
      name,
      value,
      environmentId: environment.id,
    },
  });
};

export default updateVariable;
