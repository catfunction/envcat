"use server";

import { PrismaClient } from "database";
import crypto from "crypto";
import passwordHash from "@src/lib/passwordHash";

const prisma = new PrismaClient();

const createAdminUser = async (values: { email: string; password: string }) => {
  try {
    const roleAdmin = await prisma.role.findFirst({
      where: { name: "ADMIN" },
    });

    await prisma.user.create({
      data: {
        email: values.email,
        ...generatePassword(values.password),
        role: { connect: { id: roleAdmin.id } },
      },
    });
  } catch (e) {
    console.error(e);
  }
};

const generatePassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");

  return {
    salt,
    password: passwordHash(password, salt),
  };
};

export default createAdminUser;
