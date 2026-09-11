"use client"

import { useActionState } from "react"
import { createEducationAction, deleteEducationAction } from "@/actions/education"
import { Button, Input, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"

export function EducationManager({ education }: { education: any[] }) {
  const [state, action, pending] = useActionState(createEducationAction, null)

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button><Plus className="mr-2 h-4 w-4" />Add Education</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Education</DialogTitle></DialogHeader>
          <form action={action} className="space-y-3">
            <Input name="institution" label="Institution" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="degree" label="Degree" />
              <Input name="field" label="Field" />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Input name="startDate" label="Start Date" type="date" />
              <Input name="endDate" label="End Date" type="date" />
            </div>
            <label className="flex items-center gap-2 text-sm">
              <input type="checkbox" name="current" value="true" /> Currently enrolled
            </label>
            <Input name="gpa" label="GPA" />
            <Button type="submit" disabled={pending}>Add Education</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {education.map((edu) => (
          <div key={edu.id} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                  {edu.degree} in {edu.field}
                </h3>
                <p className="text-sm text-neutral-500">{edu.institution}</p>
                <p className="mt-1 text-xs text-neutral-400">
                  {formatDate(edu.startDate)} — {edu.current ? "Present" : edu.endDate ? formatDate(edu.endDate) : ""}
                </p>
              </div>
              <form action={async () => { await deleteEducationAction(edu.id) }}>
                <button type="submit" className="text-neutral-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
