"use server";

import { PrismaClient } from "database";

const prisma = new PrismaClient();

const createEnvironment = async (values: {
  projectId: string;
  name: string;
}) => {
  try {
    return await prisma.environment.create({ data: values });
  } catch (e) {
    console.error(e);
  }
};

export default createEnvironment;
