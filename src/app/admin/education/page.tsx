import { prisma } from "@/lib/prisma"
import { EducationManager } from "./education-manager"

export const dynamic = "force-dynamic"

export default async function AdminEducationPage() {
  const education = await prisma.education.findMany({
    orderBy: [{ current: "desc" }, { startDate: "desc" }],
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Education
        </h2>
        <p className="mt-1 text-sm text-neutral-500">Manage your education history</p>
      </div>
      <EducationManager education={education} />
    </div>
  )
}
