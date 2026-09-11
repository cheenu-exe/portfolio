import { prisma } from "@/lib/prisma"
import { SkillsManager } from "./skills-manager"

export const dynamic = "force-dynamic"

export default async function AdminSkillsPage() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Skills
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your skills and categories
        </p>
      </div>
      <SkillsManager skills={skills} />
    </div>
  )
}
