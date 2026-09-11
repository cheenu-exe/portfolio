"use client"

import { deleteMessageAction } from "@/actions/messages"
import { formatDate } from "@/lib/utils"
import { Card } from "@/components/ui"
import { Trash2, Mail, MailOpen } from "lucide-react"

export function MessagesInbox({ messages }: { messages: any[] }) {
  if (messages.length === 0) {
    return (
      <div className="rounded-xl border border-neutral-200 p-8 text-center text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
        No messages yet.
      </div>
    )
  }

  return (
    <div className="space-y-3">
      {messages.map((msg) => (
        <Card key={msg.id} className={`p-4 ${!msg.read ? "border-l-4 border-l-neutral-900 dark:border-l-neutral-100" : ""}`}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                {msg.read ? (
                  <MailOpen className="h-4 w-4 text-neutral-400" />
                ) : (
                  <Mail className="h-4 w-4 text-neutral-900 dark:text-neutral-100" />
                )}
                <span className="font-medium text-neutral-900 dark:text-neutral-100">
                  {msg.name}
                </span>
                <span className="text-sm text-neutral-400">
                  &lt;{msg.email}&gt;
                </span>
              </div>
              {msg.subject && (
                <p className="text-sm font-medium text-neutral-600 dark:text-neutral-300">
                  {msg.subject}
                </p>
              )}
              <p className="text-sm text-neutral-500 dark:text-neutral-400 whitespace-pre-wrap">
                {msg.message}
              </p>
              <p className="text-xs text-neutral-400">{formatDate(msg.createdAt)}</p>
            </div>
            <form action={async () => { await deleteMessageAction(msg.id) }}>
              <button
                type="submit"
                className="text-neutral-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </form>
          </div>
        </Card>
      ))}
    </div>
  )
}
