import { prisma } from "@/lib/prisma"

const categoryLabels: Record<string, string> = {
  programming: "Programming Languages",
  frontend: "Frontend",
  backend: "Backend",
  cybersecurity: "Cybersecurity",
  cloud: "Cloud",
  devops: "DevOps",
  tools: "Tools",
}

export async function SkillsSection() {
  const skills = await prisma.skill.findMany({
    orderBy: [{ category: "asc" }, { displayOrder: "asc" }],
  })

  if (skills.length === 0) return null

  const grouped = skills.reduce(
    (acc, skill) => {
      const cat = skill.category
      if (!acc[cat]) acc[cat] = []
      acc[cat].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>
  )

  return (
    <section id="skills" className="border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Skills
        </h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                {categoryLabels[category] ?? category}
              </h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {items.map((skill) => (
                  <span
                    key={skill.id}
                    className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm text-neutral-700 dark:border-neutral-800 dark:bg-neutral-900 dark:text-neutral-300"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
