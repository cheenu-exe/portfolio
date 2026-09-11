import { Card } from "@/components/ui"
import { SettingsForm } from "./settings-form"

export const dynamic = "force-dynamic"

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Settings
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Configure your portfolio settings
        </p>
      </div>
      <Card className="p-6 max-w-2xl">
        <SettingsForm />
      </Card>
    </div>
  )
}
