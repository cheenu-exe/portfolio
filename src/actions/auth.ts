"use server"

import { signIn, signOut } from "@/lib/auth"
import { loginSchema } from "@/validations/auth"
import { AuthError } from "next-auth"

type LoginState = {
  ok: boolean
  errors?: {
    email?: string[]
    password?: string[]
    form?: string[]
  }
} | null

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors }
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirectTo: "/admin",
    })
    return { ok: true }
  } catch (error) {
    if (error instanceof AuthError) {
      return { ok: false, errors: { form: ["Invalid email or password"] } }
    }
    throw error
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/" })
}
