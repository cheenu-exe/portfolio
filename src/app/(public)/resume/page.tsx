import { prisma } from "@/lib/prisma"
import { Button, Card } from "@/components/ui"
import { Download, FileText } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Resume",
  description: "Download my resume",
}

export default async function ResumePage() {
  const resume = await prisma.resume.findFirst({
    where: { isCurrent: true },
    orderBy: { createdAt: "desc" },
  })

  if (!resume) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-16 text-center">
        <h1 className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
          Resume
        </h1>
        <p className="mt-2 text-neutral-500">Resume not available yet.</p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Resume
        </h1>
        <p className="mt-2 text-neutral-500 dark:text-neutral-400">
          Last updated {formatDate(resume.createdAt)}
        </p>
      </div>

      <Card className="p-6">
        <div className="flex items-center gap-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neutral-100 dark:bg-neutral-800">
            <FileText className="h-8 w-8 text-neutral-500" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
              {resume.title}
            </h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              PDF &middot; Version {resume.version}
              {resume.fileSize &&
                ` &middot; ${(resume.fileSize / 1024 / 1024).toFixed(1)} MB`}
            </p>
          </div>
          <Button asChild>
            <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        </div>
      </Card>

      <div className="mt-8">
        <iframe
          src={resume.fileUrl}
          className="h-[800px] w-full rounded-xl border border-neutral-200 dark:border-neutral-800"
          title="Resume preview"
        />
      </div>
    </div>
  )
}
