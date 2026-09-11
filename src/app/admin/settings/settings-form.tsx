"use client"

import { Button, Input } from "@/components/ui"
import { siteConfig } from "@/config/site"

export function SettingsForm() {
  return (
    <form
      action="/admin/settings"
      method="POST"
      className="space-y-4"
    >
      <p className="text-sm text-neutral-500 dark:text-neutral-400">
        Site settings are managed in <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs dark:bg-neutral-800">src/config/site.ts</code>.
        Environment variables are in <code className="rounded bg-neutral-100 px-1.5 py-0.5 text-xs dark:bg-neutral-800">.env</code>.
      </p>
      <div className="rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-800 dark:bg-neutral-900">
        <p className="text-xs text-neutral-500">
          Site name: <strong>{siteConfig.name}</strong><br />
          Site URL: <strong>{siteConfig.url}</strong><br />
          Pages managed: <strong>{siteConfig.nav.length}</strong>
        </p>
      </div>
      <Button type="button" variant="secondary" disabled>
        Save settings (coming soon)
      </Button>
    </form>
  )
}
