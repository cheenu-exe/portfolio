import { PrismaClient } from "@/generated/prisma/client"
import { PrismaPg } from "@prisma/adapter-pg"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function getPrismaClient() {
  if (!globalForPrisma.prisma) {
    const connectionString =
      process.env.DATABASE_URL ??
      process.env.cheenu_portfolio_PRISMA_DATABASE_URL ??
      process.env.cheenu_portfolio_DATABASE_URL ??
      process.env.cheenu_portfolio_POSTGRES_URL

    if (!connectionString) {
      throw new Error("No database connection URL is configured")
    }

    const adapter = new PrismaPg({ connectionString })
    globalForPrisma.prisma = new PrismaClient({ adapter })
  }

  return globalForPrisma.prisma
}

// Defer database initialization until a query is made. This lets Next.js load
// server modules during builds without requiring production DB credentials.
export const prisma = new Proxy({} as PrismaClient, {
  get(_target, property) {
    const client = getPrismaClient()
    const value = Reflect.get(client, property, client)

    return typeof value === "function" ? value.bind(client) : value
  },
})
