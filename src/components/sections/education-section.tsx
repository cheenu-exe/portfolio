import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui"

export async function EducationSection() {
  const education = await prisma.education.findMany({
    orderBy: [{ current: "desc" }, { startDate: "desc" }],
  })

  if (education.length === 0) return null

  return (
    <section id="education" className="border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Education
        </h2>
        <div className="mt-8 space-y-8">
          {education.map((edu) => (
            <div key={edu.id} className="relative pl-8 before:absolute before:left-[7px] before:top-2 before:h-full before:w-px before:bg-neutral-200 dark:before:bg-neutral-800">
              <div className="absolute left-0 top-2 h-3.5 w-3.5 rounded-full border-2 border-neutral-300 bg-white dark:border-neutral-600 dark:bg-neutral-900" />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {edu.degree} in {edu.field}
                  </h3>
                  {edu.current && (
                    <Badge variant="primary">Current</Badge>
                  )}
                </div>
                <p className="text-sm text-neutral-500">{edu.institution}</p>
                <p className="mt-1 text-sm text-neutral-400">
                  {formatDate(edu.startDate)} —{" "}
                  {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                </p>
                {edu.gpa && (
                  <p className="mt-1 text-sm text-neutral-500">GPA: {edu.gpa}</p>
                )}
                {edu.achievements.length > 0 && (
                  <ul className="mt-2 space-y-1">
                    {edu.achievements.map((a, i) => (
                      <li key={i} className="text-sm text-neutral-600 dark:text-neutral-300">
                        &bullet; {a}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
