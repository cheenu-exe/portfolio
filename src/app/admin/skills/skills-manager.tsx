"use client"

import { useActionState, useState } from "react"
import { createSkillAction, deleteSkillAction } from "@/actions/skills"
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { Trash2 } from "lucide-react"

const categories = [
  "programming", "frontend", "backend", "cybersecurity", "cloud", "devops", "tools"
]

export function SkillsManager({ skills }: { skills: any[] }) {
  const [state, action, pending] = useActionState(createSkillAction, null)

  const grouped = skills.reduce((acc: Record<string, any[]>, s: any) => {
    if (!acc[s.category]) acc[s.category] = []
    acc[s.category].push(s)
    return acc
  }, {})

  return (
    <div className="space-y-8">
      <form action={action} className="flex flex-wrap items-end gap-3 rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
        <Input name="name" placeholder="Skill name" className="w-48" />
        <Select name="category" defaultValue="programming">
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>{c}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" disabled={pending}>
          {pending ? "Adding..." : "Add Skill"}
        </Button>
      </form>

      {Object.entries(grouped).map(([category, items]: [string, any[]]) => (
        <div key={category}>
          <h3 className="mb-3 text-xs font-medium uppercase tracking-wider text-neutral-400">
            {category}
          </h3>
          <div className="flex flex-wrap gap-2">
            {items.map((skill: any) => (
              <div
                key={skill.id}
                className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm dark:border-neutral-800 dark:bg-neutral-950"
              >
                {skill.name}
                <form action={async () => { await deleteSkillAction(skill.id) }}>
                  <button type="submit" className="text-neutral-400 hover:text-red-500">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
