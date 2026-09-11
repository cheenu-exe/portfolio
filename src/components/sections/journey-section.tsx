import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui"
import { BookOpen, GraduationCap, Globe, FolderGit2, Award, LucideIcon } from "lucide-react"

const categoryIcons: Record<string, LucideIcon> = {
  course: GraduationCap,
  book: BookOpen,
  conference: Globe,
  project: FolderGit2,
  certification: Award,
}

const categoryLabels: Record<string, string> = {
  course: "Course",
  book: "Book",
  conference: "Conference",
  project: "Project",
  certification: "Certification",
  other: "Other",
}

export async function JourneySection() {
  const entries = await prisma.journey.findMany({
    orderBy: [{ date: "desc" }, { displayOrder: "asc" }],
    take: 10,
  })

  if (entries.length === 0) return null

  return (
    <section id="journey" className="border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Learning Journey
        </h2>
        <div className="mt-8 space-y-6">
          {entries.map((entry) => {
            const Icon = categoryIcons[entry.category] ?? BookOpen
            return (
              <div
                key={entry.id}
                className="group relative flex items-start gap-4 rounded-xl border border-transparent p-4 transition-colors hover:border-neutral-200 dark:hover:border-neutral-800"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-neutral-100 dark:bg-neutral-800">
                  <Icon className="h-5 w-5 text-neutral-500" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                        {entry.title}
                      </h3>
                      <p className="text-xs text-neutral-400">
                        {categoryLabels[entry.category] ?? entry.category} ·{" "}
                        {formatDate(entry.date)}
                      </p>
                    </div>
                    {entry.url && (
                      <a
                        href={entry.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="opacity-0 transition-opacity group-hover:opacity-100"
                        aria-label="View link"
                      >
                        <Globe className="h-4 w-4 text-neutral-400" />
                      </a>
                    )}
                  </div>
                  {entry.description && (
                    <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
                      {entry.description}
                    </p>
                  )}
                  {entry.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {entry.tags.map((tag) => (
                        <Badge key={tag} variant="default">{tag}</Badge>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
