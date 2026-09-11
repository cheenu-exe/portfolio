"use client"

import { useActionState } from "react"
import { createMessageAction } from "@/actions/messages"
import { Button, Input, Textarea } from "@/components/ui"

type StateErrors = {
  name?: string[]
  email?: string[]
  subject?: string[]
  message?: string[]
}

export function ContactForm() {
  const [state, action, pending] = useActionState(createMessageAction, null)
  const errors = state?.errors as StateErrors | undefined

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-8 text-center dark:border-green-900 dark:bg-green-950">
        <p className="text-lg font-medium text-green-700 dark:text-green-400">
          Message sent successfully!
        </p>
        <p className="mt-1 text-sm text-green-600 dark:text-green-500">
          I&apos;ll get back to you as soon as possible.
        </p>
      </div>
    )
  }

  return (
    <form action={action} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Name"
          name="name"
          placeholder="Your name"
          error={errors?.name?.[0]}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          placeholder="your@email.com"
          error={errors?.email?.[0]}
        />
      </div>
      <Input
        label="Subject"
        name="subject"
        placeholder="What's this about?"
        error={errors?.subject?.[0]}
      />
      <Textarea
        label="Message"
        name="message"
        placeholder="Your message..."
        rows={6}
        error={errors?.message?.[0]}
      />
      <Button type="submit" disabled={pending}>
        {pending ? "Sending..." : "Send message"}
      </Button>
    </form>
  )
}
