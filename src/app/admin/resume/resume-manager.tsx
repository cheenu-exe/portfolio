"use client"

import { useActionState } from "react"
import { uploadResumeAction, deleteResumeAction } from "@/actions/resume"
import { Button, Input, Card } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import { Download, FileText, Trash2 } from "lucide-react"

export function ResumeManager({
  currentResume,
  allResumes,
}: {
  currentResume: any
  allResumes: any[]
}) {
  const [state, action, pending] = useActionState(uploadResumeAction, null)

  return (
    <div className="space-y-8">
      <Card className="p-6">
        <h3 className="mb-4 font-medium text-neutral-900 dark:text-neutral-100">
          Upload New Resume
        </h3>
        <form action={action} className="space-y-3">
          <Input name="title" label="Title" placeholder="My Resume - 2026" />
          <Input name="fileUrl" label="File URL" placeholder="https://..." />
          <Input name="fileSize" label="File Size (bytes)" type="number" />
          <Button type="submit" disabled={pending}>
            {pending ? "Uploading..." : "Upload Resume"}
          </Button>
        </form>
      </Card>

      {allResumes.map((resume) => (
        <Card key={resume.id} className="flex items-center gap-4 p-4">
          <FileText className="h-8 w-8 text-neutral-400" />
          <div className="flex-1">
            <p className="font-medium text-neutral-900 dark:text-neutral-100">
              {resume.title}
              {resume.isCurrent && (
                <span className="ml-2 text-xs text-green-600">Current</span>
              )}
            </p>
            <p className="text-sm text-neutral-500">
              v{resume.version} · {formatDate(resume.createdAt)}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" asChild>
              <a href={resume.fileUrl} target="_blank" rel="noopener noreferrer">
                <Download className="h-4 w-4" />
              </a>
            </Button>
            {!resume.isCurrent && (
              <form action={async () => { await deleteResumeAction(resume.id) }}>
                <Button type="submit" variant="ghost" size="icon" className="text-red-500">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </form>
            )}
          </div>
        </Card>
      ))}
    </div>
  )
}
