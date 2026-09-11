import { PrismaClient } from "../src/generated/prisma"
import { PrismaPg } from "@prisma/adapter-pg"
import bcrypt from "bcryptjs"

const connectionString = process.env.DATABASE_URL
if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set")
}

const adapter = new PrismaPg({ connectionString })
const prisma = new PrismaClient({ adapter })

async function main() {
  const passwordHash = await bcrypt.hash("admin123", 12)

  const user = await prisma.user.upsert({
    where: { email: "admin@portfolio.dev" },
    update: {},
    create: {
      email: "admin@portfolio.dev",
      name: "Admin",
      passwordHash,
      role: "admin",
    },
  })

  console.log("Seeded admin user:", user.email)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
