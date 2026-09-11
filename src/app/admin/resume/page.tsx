import { prisma } from "@/lib/prisma"
import { ResumeManager } from "./resume-manager"

export const dynamic = "force-dynamic"

export default async function AdminResumePage() {
  const resumes = await prisma.resume.findMany({
    orderBy: { createdAt: "desc" },
  })

  const currentResume = resumes.find((r) => r.isCurrent)

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Resume
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Upload and manage your resume versions
        </p>
      </div>
      <ResumeManager currentResume={currentResume} allResumes={resumes} />
    </div>
  )
}
