import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { ExternalLink } from "lucide-react"

export const dynamic = "force-dynamic"

export const metadata = {
  title: "Projects",
  description: "Software engineering and cybersecurity projects",
}

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({
    orderBy: [{ pinned: "desc" }, { displayOrder: "asc" }, { createdAt: "desc" }],
  })

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
        Projects
      </h1>
      <p className="mt-2 text-neutral-500 dark:text-neutral-400">
        A selection of things I&apos;ve built
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <Link key={project.id} href={`/projects/${project.slug}`}>
            <Card className="group h-full transition-shadow hover:shadow-md">
              {project.coverImage && (
                <div className="aspect-video overflow-hidden rounded-t-xl bg-neutral-100 dark:bg-neutral-800">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>
              )}
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-base">{project.title}</CardTitle>
                  <div className="flex gap-1.5">
                    {project.githubUrl && (
                      <svg className="h-4 w-4 text-neutral-400" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                      </svg>
                    )}
                    {project.liveUrl && (
                      <ExternalLink className="h-4 w-4 text-neutral-400" />
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-2">
                  {project.description}
                </p>
                {project.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 4).map((tech) => (
                      <Badge key={tech} variant="default">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {projects.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-neutral-500 dark:text-neutral-400">No projects yet.</p>
        </div>
      )}
    </div>
  )
}
