"use server";

import { Prisma, PrismaClient } from "database";

const prisma = new PrismaClient();

const createEnvironment = async (values: {
  projectId: string;
  name: string;
}) => {
  try {
    await prisma.environment.create({ data: values });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return {
        error: `Environment name ${values.name} already exists`,
      };
    }
    return { error: "Unexpected error occurred" };
  }
};

export default createEnvironment;
