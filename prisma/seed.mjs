import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();
const hashedPassword = await bcrypt.hash("password123", 10);

async function main() {
  await prisma.user.create({
    data: {
      username: "jdoe",
      email: "johndoe@example.com",
      password: hashedPassword,
    },
  });

  console.log("✅ Seeding complete!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
