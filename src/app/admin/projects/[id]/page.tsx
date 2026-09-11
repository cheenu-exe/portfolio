import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"
import { ProjectForm } from "./project-form"

export const dynamic = "force-dynamic"

export default async function AdminProjectEditPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  if (id === "new") {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            New Project
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Add a new project to your portfolio
          </p>
        </div>
        <ProjectForm />
      </div>
    )
  }

  const project = await prisma.project.findUnique({ where: { id } })
  if (!project) notFound()

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Edit Project
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Update your project details
        </p>
      </div>
      <ProjectForm project={project} />
    </div>
  )
}
