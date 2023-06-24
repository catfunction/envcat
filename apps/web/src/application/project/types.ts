import { Prisma } from "database";

const projectWithEnvironments = Prisma.validator<Prisma.ProjectArgs>()({
  include: { environment: { include: { variables: true } } },
});

export type projectWithEnvironments = Prisma.ProjectGetPayload<
  typeof projectWithEnvironments
>;
