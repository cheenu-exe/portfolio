"use client"

import { useSession } from "next-auth/react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui"
import { signOut } from "next-auth/react"
import { ChevronDown } from "lucide-react"

export function AdminHeader() {
  const { data: session } = useSession()

  return (
    <header className="flex h-16 items-center justify-between border-b border-neutral-200/50 bg-white/80 px-6 backdrop-blur-xl dark:border-neutral-800/50 dark:bg-neutral-950/80">
      <div>
        <h1 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Welcome back
        </h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800">
          {session?.user?.name ?? "Admin"}
          <ChevronDown className="h-4 w-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => signOut({ callbackUrl: "/" })}>
            Sign out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
