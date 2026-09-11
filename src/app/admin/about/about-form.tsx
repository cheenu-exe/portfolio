"use client"

import { useActionState } from "react"
import { updateAboutAction } from "@/actions/about"
import { Button, Input, Textarea } from "@/components/ui"

export function AboutForm({ about }: { about: any }) {
  const [state, action, pending] = useActionState(updateAboutAction, null)

  return (
    <form action={action} className="max-w-2xl space-y-4">
      <Textarea
        label="Bio"
        name="bio"
        defaultValue={about?.bio ?? ""}
        className="min-h-[150px]"
      />
      <Input
        label="Headline"
        name="headline"
        defaultValue={about?.headline ?? ""}
        placeholder="Full Stack Engineer & Cybersecurity Analyst"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Location"
          name="location"
          defaultValue={about?.location ?? ""}
        />
        <Input
          label="Email"
          name="email"
          type="email"
          defaultValue={about?.email ?? ""}
        />
        <Input
          label="Phone"
          name="phone"
          defaultValue={about?.phone ?? ""}
        />
        <Input
          label="Avatar URL"
          name="avatarUrl"
          defaultValue={about?.avatarUrl ?? ""}
        />
      </div>
      <Input
        label="GitHub URL"
        name="socialLinks"
        defaultValue={about?.socialLinks?.github ?? ""}
        placeholder="https://github.com/username"
      />
      <Input
        label="LinkedIn URL"
        name="socialLinks"
        defaultValue={about?.socialLinks?.linkedin ?? ""}
        placeholder="https://linkedin.com/in/username"
      />

      <Button type="submit" disabled={pending}>
        {pending ? "Saving..." : "Save About"}
      </Button>
    </form>
  )
}
