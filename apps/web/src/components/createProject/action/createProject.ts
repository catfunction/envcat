"use server";

import { Prisma, PrismaClient } from "database";

const prisma = new PrismaClient();

const createProject = async (values: {
  name: string;
  description: string;
}): Promise<{ id?: string; error?: string }> => {
  try {
    return await prisma.project.create({ data: values, select: { id: true } });
  } catch (e) {
    if (
      e instanceof Prisma.PrismaClientKnownRequestError &&
      e.code === "P2002"
    ) {
      return { error: "Project name already exists" };
    }

    return { error: "Unexpected error occurred" };
  }
};

export default createProject;
