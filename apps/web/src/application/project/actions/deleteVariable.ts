"use server";

import { prisma } from "database";

const deleteVariable = async ({ environmentId, name }) => {
  await prisma.variable.deleteMany({
    where: {
      name,
      environmentId,
    },
  });
};

export default deleteVariable;
