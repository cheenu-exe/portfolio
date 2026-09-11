"use client"

import { useActionState, useState } from "react"
import { createExperienceAction, deleteExperienceAction } from "@/actions/experience"
import { Button, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Badge } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"

export function ExperienceManager({ experiences }: { experiences: any[] }) {
  const [state, action, pending] = useActionState(createExperienceAction, null)

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button><Plus className="mr-2 h-4 w-4" />Add Experience</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Experience</DialogTitle></DialogHeader>
          <form action={action} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <Input name="company" label="Company" />
              <Input name="role" label="Role" />
            </div>
            <Textarea name="description" label="Description" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="startDate" label="Start Date" type="date" />
              <Input name="endDate" label="End Date" type="date" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="current" value="true" /> Current position
            </label>
            <Input name="location" label="Location" />
            <Button type="submit" disabled={pending}>Add Experience</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {experiences.map((exp) => (
          <div key={exp.id} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{exp.role}</h3>
                <p className="text-sm text-neutral-500">{exp.company}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  {formatDate(exp.startDate)} — {exp.current ? "Present" : exp.endDate ? formatDate(exp.endDate) : ""}
                </p>
              </div>
              <form action={async () => { await deleteExperienceAction(exp.id) }}>
                <button type="submit" className="text-neutral-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
