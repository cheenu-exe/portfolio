import { prisma } from "@/lib/prisma"
import { Button } from "@/components/ui"
import { DataTable } from "@/components/admin/data-table"
import { DeleteButton } from "@/components/admin/delete-button"
import { deleteProjectAction } from "@/actions/projects"
import { formatDate } from "@/lib/utils"
import { Plus } from "lucide-react"
import Link from "next/link"

export const dynamic = "force-dynamic"

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Projects
          </h2>
          <p className="mt-1 text-sm text-neutral-500">
            Manage your portfolio projects
          </p>
        </div>
        <Button asChild>
          <Link href="/admin/projects/new">
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Link>
        </Button>
      </div>

      <DataTable
        columns={[
          { key: "title", header: "Title" },
          {
            key: "status",
            header: "Status",
            render: (p) => (
              <span className="text-xs capitalize">{p.status}</span>
            ),
          },
          {
            key: "featured",
            header: "Featured",
            render: (p) => (p.featured ? "Yes" : "No"),
          },
          {
            key: "createdAt",
            header: "Created",
            render: (p) => formatDate(p.createdAt),
          },
        ]}
        data={projects}
        actions={(p) => (
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="sm" asChild>
              <Link href={`/admin/projects/${p.id}`}>Edit</Link>
            </Button>
            <DeleteButton action={deleteProjectAction} id={p.id} />
          </div>
        )}
      />
    </div>
  )
}
