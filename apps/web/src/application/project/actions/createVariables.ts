"use server";

import { Prisma, PrismaClient } from "database";

const prisma = new PrismaClient();

const createVariables = async (values: {
  projectId: string;
  variables: { name: string; value: string }[];
  environments: string[];
}) => {
  const createPromises: { data: any; promise: Promise<any> }[] = [];
  values.environments.forEach((environment) => {
    values.variables.forEach((variable) => {
      createPromises.push({
        data: variable,
        promise: prisma.variable.create({
          data: { ...variable, environmentId: environment },
        }),
      });
    });
  });

  for (const create of createPromises) {
    try {
      await create.promise;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        console.log({
          variable: create.data.name,
          error: `Variable name ${create.data.name} already exists`,
        });
        return {
          variable: create.data.name,
          error: `Variable name ${create.data.name} already exists`,
        };
      }

      return { variable: create.data.name, error: "Unexpected error occurred" };
    }
  }
};

export default createVariables;
