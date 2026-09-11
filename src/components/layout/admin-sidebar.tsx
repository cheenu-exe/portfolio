"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Award,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  Mail,
  Settings,
  LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  LayoutDashboard,
  FolderKanban,
  Code2,
  Award,
  FileText,
  User,
  Briefcase,
  GraduationCap,
  BookOpen,
  Mail,
  Settings,
}

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 flex-col border-r border-neutral-200/50 bg-white dark:border-neutral-800/50 dark:bg-neutral-950 lg:flex">
      <div className="flex h-16 items-center border-b border-neutral-200/50 px-6 dark:border-neutral-800/50">
        <Link
          href="/admin"
          className="text-lg font-semibold tracking-tight text-neutral-900 dark:text-neutral-100"
        >
          {siteConfig.name}
          <span className="text-neutral-400"> /admin</span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-4">
        {siteConfig.adminNav.map((item) => {
          const Icon = iconMap[item.icon]
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-neutral-100 text-neutral-900 dark:bg-neutral-800 dark:text-neutral-100"
                  : "text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
              )}
            >
              {Icon && <Icon className="h-4 w-4" />}
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-neutral-200/50 p-4 dark:border-neutral-800/50">
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900 dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-neutral-100"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </aside>
  )
}
