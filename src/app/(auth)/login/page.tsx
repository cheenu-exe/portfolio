import { LoginForm } from "./login-form"

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4 dark:bg-neutral-900">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
            Admin Login
          </h1>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Sign in to manage your portfolio
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
