"use client"

import { Button } from "@/components/ui"
import { Trash2 } from "lucide-react"
import { useActionState } from "react"

export function DeleteButton({
  action,
  id,
}: {
  action: (id: string) => Promise<void>
  id: string
}) {
  const [, submitAction, pending] = useActionState(async () => {
    await action(id)
  }, null)

  return (
    <form action={submitAction}>
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        disabled={pending}
        className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </form>
  )
}
