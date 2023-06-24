"use server";

import { PrismaClient } from "database";

const prisma = new PrismaClient();

const createProject = async (values: { name: string; description: string }) => {
  try {
    return await prisma.project.create({ data: values });
  } catch (e) {
    console.error(e);
  }
};

export default createProject;
