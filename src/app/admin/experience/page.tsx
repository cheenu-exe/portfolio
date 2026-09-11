import { prisma } from "@/lib/prisma"
import { ExperienceManager } from "./experience-manager"

export const dynamic = "force-dynamic"

export default async function AdminExperiencePage() {
  const experiences = await prisma.experience.findMany({
    orderBy: [{ current: "desc" }, { startDate: "desc" }],
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Experience
        </h2>
        <p className="mt-1 text-sm text-neutral-500">Manage your work experience</p>
      </div>
      <ExperienceManager experiences={experiences} />
    </div>
  )
}
