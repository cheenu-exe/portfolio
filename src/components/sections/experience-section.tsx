import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui"

export async function ExperienceSection() {
  const experiences = await prisma.experience.findMany({
    orderBy: [
      { current: "desc" },
      { displayOrder: "asc" },
      { startDate: "desc" },
    ],
  })

  if (experiences.length === 0) return null

  return (
    <section id="experience" className="border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Experience
        </h2>
        <div className="mt-8 space-y-8">
          {experiences.map((exp) => (
            <div key={exp.id} className="relative pl-8 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
              <div className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {exp.role}
                  </h3>
                  {exp.current && (
                    <Badge variant="primary">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-500">
                  {exp.company}
                  {exp.location && ` \u2022 ${exp.location}`}
                </p>
                <p className="mt-1 text-sm text-neutral-400">
                  {formatDate(exp.startDate)} —{" "}
                  {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                </p>
                {exp.description && (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-600 dark:text-neutral-300">
                    {exp.description}
                  </p>
                )}
                {exp.technologies.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {exp.technologies.map((tech) => (
                      <Badge key={tech} variant="default">{tech}</Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
