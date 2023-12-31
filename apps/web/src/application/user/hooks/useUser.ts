import { authOptions } from "@src/app/api/auth/[...nextauth]/options";
import { prisma } from "database";
import { getServerSession } from "next-auth";

const useUser = async () => {
  const session = await getServerSession(authOptions);

  return prisma.user.findUnique({
    where: { email: session.user.email },
  });
};

export default useUser;
