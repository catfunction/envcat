import { PrismaClient } from "@prisma/client";
import { fieldEncryptionExtension } from "prisma-field-encryption";

const globalClient = new PrismaClient();

export * from "@prisma/client";
export const prisma = globalClient.$extends(fieldEncryptionExtension());
