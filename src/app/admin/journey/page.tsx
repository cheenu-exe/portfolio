import { prisma } from "@/lib/prisma"
import { JourneyManager } from "./journey-manager"

export const dynamic = "force-dynamic"

export default async function AdminJourneyPage() {
  const entries = await prisma.journey.findMany({
    orderBy: { date: "desc" },
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Learning Journey
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Track your learning milestones
        </p>
      </div>
      <JourneyManager entries={entries} />
    </div>
  )
}
