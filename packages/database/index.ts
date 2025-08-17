import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";
import {
  Account,
  Environment,
  Project,
  Role,
  Session,
  User,
  Variable,
  Prisma,
} from "@prisma/client";

const globalClient = new PrismaClient();

export { Account, Environment, Project, Role, Session, User, Variable, Prisma };
export const prisma = globalClient.$extends(fieldEncryptionExtension());
