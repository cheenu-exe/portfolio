export const siteConfig = {
  name: "Srinivas",
  title: "Srinivas — Full Stack Engineer & Cybersecurity Analyst",
  description:
    "Personal portfolio showcasing software engineering and cybersecurity projects, skills, and experience.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  ogImage: "/og.jpg",
  links: {
    github: "https://github.com/srinivas",
    linkedin: "https://linkedin.com/in/srinivas",
    twitter: "https://twitter.com/srinivas",
  },
  nav: [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ],
  adminNav: [
    { label: "Dashboard", href: "/admin", icon: "LayoutDashboard" },
    { label: "Projects", href: "/admin/projects", icon: "FolderKanban" },
    { label: "Skills", href: "/admin/skills", icon: "Code2" },
    { label: "Certificates", href: "/admin/certificates", icon: "Award" },
    { label: "Resume", href: "/admin/resume", icon: "FileText" },
    { label: "About", href: "/admin/about", icon: "User" },
    { label: "Experience", href: "/admin/experience", icon: "Briefcase" },
    { label: "Education", href: "/admin/education", icon: "GraduationCap" },
    { label: "Journey", href: "/admin/journey", icon: "BookOpen" },
    { label: "Messages", href: "/admin/messages", icon: "Mail" },
    { label: "Settings", href: "/admin/settings", icon: "Settings" },
  ],
} as const

export type SiteConfig = typeof siteConfig
