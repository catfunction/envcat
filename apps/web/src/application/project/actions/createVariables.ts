"use server";

import { prisma, Prisma } from "database";
import { createId } from "@paralleldrive/cuid2";

const createVariables = async (values: {
  projectId: string;
  variables: { name: string; value: string }[];
  environments: string[];
}) => {
  const createVariablesPromises: { data: any; promise: Promise<any> }[] = [];
  const createEnvironmentPromises: Promise<any>[] = [];
  values.environments.forEach((environment) => {
    createEnvironmentPromises.push(
      prisma.environment.update({
        where: { id: environment },
        data: { version: createId() },
      })
    );
    values.variables.forEach((variable) => {
      createVariablesPromises.push({
        data: variable,
        promise: prisma.variable.create({
          data: { ...variable, environmentId: environment },
        }),
      });
    });
  });

  for (const create of createVariablesPromises) {
    try {
      await create.promise;
    } catch (e) {
      if (
        e instanceof Prisma.PrismaClientKnownRequestError &&
        e.code === "P2002"
      ) {
        return {
          variable: create.data.name,
          error: `Variable name ${create.data.name} already exists`,
        };
      }

      return { variable: create.data.name, error: "Unexpected error occurred" };
    }
  }

  try {
    await Promise.all(createEnvironmentPromises);

    return { success: true };
  } catch (e) {
    console.error(e);
  }
};

export default createVariables;
