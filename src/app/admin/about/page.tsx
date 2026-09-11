import { prisma } from "@/lib/prisma"
import { AboutForm } from "./about-form"

export const dynamic = "force-dynamic"

export default async function AdminAboutPage() {
  const about = await prisma.about.findFirst()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          About
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Edit your about section content
        </p>
      </div>
      <AboutForm about={about} />
    </div>
  )
}
