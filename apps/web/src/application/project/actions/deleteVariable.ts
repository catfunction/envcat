"use server";

import { prisma } from "database";

type DeleteVariableParams = {
  environmentId: string;
  name: string;
};

const deleteVariable = async ({ environmentId, name }: DeleteVariableParams) => {
  await prisma.variable.deleteMany({
    where: {
      name,
      environmentId,
    },
  });
};

export default deleteVariable;
