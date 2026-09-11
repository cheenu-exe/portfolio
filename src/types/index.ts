import type { auth } from "@/lib/auth"

export type Session = Awaited<ReturnType<typeof auth>>
export type UserRole = "admin"

export interface NavItem {
  label: string
  href: string
  icon?: string
}

export interface Project {
  id: string
  title: string
  slug: string
  description: string
  content: string | null
  coverImage: string | null
  githubUrl: string | null
  liveUrl: string | null
  technologies: string[]
  status: "draft" | "in_progress" | "completed"
  featured: boolean
  pinned: boolean
  displayOrder: number
  createdAt: Date
  updatedAt: Date
}

export interface Skill {
  id: string
  name: string
  icon: string | null
  category:
    | "programming"
    | "frontend"
    | "backend"
    | "cybersecurity"
    | "cloud"
    | "devops"
    | "tools"
  displayOrder: number
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  imageUrl: string | null
  pdfUrl: string | null
  verificationUrl: string | null
  issueDate: Date | null
  expiryDate: Date | null
  description: string | null
  displayOrder: number
}

export interface Resume {
  id: string
  title: string
  fileUrl: string
  fileSize: number | null
  version: number
  isCurrent: boolean
  createdAt: Date
}

export interface About {
  id: string
  bio: string
  avatarUrl: string | null
  headline: string | null
  location: string | null
  email: string | null
  phone: string | null
  socialLinks: {
    github?: string
    linkedin?: string
    twitter?: string
    website?: string
  } | null
  skills: string[]
}

export interface Experience {
  id: string
  company: string
  role: string
  description: string | null
  startDate: Date
  endDate: Date | null
  current: boolean
  location: string | null
  companyUrl: string | null
  technologies: string[]
  displayOrder: number
}

export interface Education {
  id: string
  institution: string
  degree: string
  field: string
  description: string | null
  startDate: Date
  endDate: Date | null
  current: boolean
  gpa: string | null
  achievements: string[]
  displayOrder: number
}

export interface Journey {
  id: string
  title: string
  description: string | null
  date: Date
  category: string
  url: string | null
  tags: string[]
  displayOrder: number
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string | null
  message: string
  read: boolean
  createdAt: Date
}
