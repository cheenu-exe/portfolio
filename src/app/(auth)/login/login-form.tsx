"use client"

import { useActionState } from "react"
import { loginAction } from "@/actions/auth"
import { Button, Input } from "@/components/ui"

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, null)

  const errors = state?.errors as
    | { email?: string[]; password?: string[]; form?: string[] }
    | undefined

  return (
    <form action={action} className="space-y-4">
      {errors?.form && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600 dark:border-red-900 dark:bg-red-950 dark:text-red-400">
          {errors.form[0]}
        </div>
      )}
      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="admin@portfolio.dev"
        autoComplete="email"
        error={errors?.email?.[0]}
      />
      <Input
        label="Password"
        name="password"
        type="password"
        placeholder="Enter your password"
        autoComplete="current-password"
        error={errors?.password?.[0]}
      />
      <Button type="submit" className="w-full" disabled={pending}>
        {pending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  )
}
