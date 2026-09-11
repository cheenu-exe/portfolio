import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui"
import { FolderKanban, Code2, Award, Mail } from "lucide-react"

export const dynamic = "force-dynamic"

async function getStats() {
  const [projects, skills, certificates, messages] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.certificate.count(),
    prisma.contactMessage.count(),
  ])
  return { projects, skills, certificates, messages }
}

export default async function AdminDashboard() {
  const stats = await getStats()

  const cards = [
    { label: "Projects", value: stats.projects, icon: FolderKanban },
    { label: "Skills", value: stats.skills, icon: Code2 },
    { label: "Certificates", value: stats.certificates, icon: Award },
    { label: "Messages", value: stats.messages, icon: Mail },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Dashboard
        </h2>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Overview of your portfolio content
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card) => (
          <Card key={card.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
                {card.label}
              </CardTitle>
              <card.icon className="h-4 w-4 text-neutral-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold text-neutral-900 dark:text-neutral-100">
                {card.value}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
