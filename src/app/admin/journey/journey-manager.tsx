"use client"

import { useActionState } from "react"
import { createJourneyAction, deleteJourneyAction } from "@/actions/journey"
import { Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Badge } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"

const categories = ["course", "book", "conference", "project", "certification", "other"]

export function JourneyManager({ entries }: { entries: any[] }) {
  const [state, action, pending] = useActionState(createJourneyAction, null)

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button><Plus className="mr-2 h-4 w-4" />Add Entry</Button>
        </DialogTrigger>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>New Journey Entry</DialogTitle></DialogHeader>
          <form action={action} className="space-y-3">
            <Input name="title" label="Title" />
            <Textarea name="description" label="Description" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="date" label="Date" type="date" />
              <Select name="category" defaultValue="course">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <Input name="url" label="URL" />
            <Button type="submit" disabled={pending}>Add Entry</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="space-y-3">
        {entries.map((entry) => (
          <div key={entry.id} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{entry.title}</h3>
                  <Badge variant="default">{entry.category}</Badge>
                </div>
                <p className="mt-1 text-xs text-neutral-400">{formatDate(entry.date)}</p>
                {entry.tags?.map((tag: string) => (
                  <Badge key={tag} variant="default" className="mr-1 mt-1">{tag}</Badge>
                ))}
              </div>
              <form action={async () => { await deleteJourneyAction(entry.id) }}>
                <button type="submit" className="text-neutral-400 hover:text-red-500"><Trash2 className="h-4 w-4" /></button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
