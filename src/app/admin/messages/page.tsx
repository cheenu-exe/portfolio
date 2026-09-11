import { prisma } from "@/lib/prisma"
import { MessagesInbox } from "./messages-inbox"

export const dynamic = "force-dynamic"

export default async function AdminMessagesPage() {
  const messages = await prisma.contactMessage.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Messages
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Contact form submissions
        </p>
      </div>
      <MessagesInbox messages={messages} />
    </div>
  )
}
