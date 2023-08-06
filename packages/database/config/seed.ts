import { prisma } from "..";

async function main() {
  await prisma.role.create({
    data: {
      name: "ADMIN",
    },
  });
  await prisma.role.create({
    data: {
      name: "USER",
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
