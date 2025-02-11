import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authenticateUser = async (username, password) => {
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user && bcrypt.compareSync(password, user.password)) {
    return user; // Return user if authenticated
  }
  return null; // Return null if authentication fails
};
