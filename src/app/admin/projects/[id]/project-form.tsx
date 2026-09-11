"use client"

import { useActionState } from "react"
import { useRouter } from "next/navigation"
import { createProjectAction, updateProjectAction } from "@/actions/projects"
import { Button, Input, Textarea, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui"
import { Badge } from "@/components/ui"
import { useState } from "react"
import { X } from "lucide-react"

interface ProjectFormProps {
  project?: {
    id: string
    title: string
    slug: string
    description: string
    content: string | null
    coverImage: string | null
    githubUrl: string | null
    liveUrl: string | null
    technologies: string[]
    status: string
    featured: boolean
    pinned: boolean
    displayOrder: number
  }
}

export function ProjectForm({ project }: ProjectFormProps) {
  const router = useRouter()
  const action = project ? updateProjectAction : createProjectAction
  const [state, formAction, pending] = useActionState(action, null)
  const [techInput, setTechInput] = useState("")
  const [technologies, setTechnologies] = useState<string[]>(
    project?.technologies ?? []
  )

  const addTech = () => {
    if (techInput && !technologies.includes(techInput)) {
      setTechnologies([...technologies, techInput])
      setTechInput("")
    }
  }

  const removeTech = (tech: string) => {
    setTechnologies(technologies.filter((t) => t !== tech))
  }

  const errors = state?.errors as Record<string, string[]> | undefined

  return (
    <form action={formAction} className="max-w-2xl space-y-4">
      {project && <input type="hidden" name="id" value={project.id} />}

      <Input
        label="Title"
        name="title"
        defaultValue={project?.title}
        error={errors?.title?.[0]}
      />

      <Input
        label="Slug"
        name="slug"
        defaultValue={project?.slug}
        placeholder="Leave empty to auto-generate"
        error={errors?.slug?.[0]}
      />

      <Textarea
        label="Description"
        name="description"
        defaultValue={project?.description}
        error={errors?.description?.[0]}
      />

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
          Technologies
        </label>
        <div className="flex gap-2">
          <input
            value={techInput}
            onChange={(e) => setTechInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTech())}
            className="flex h-10 w-full rounded-lg border border-neutral-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-100"
            placeholder="Type and press Enter"
          />
          <Button type="button" variant="secondary" onClick={addTech}>
            Add
          </Button>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {technologies.map((tech) => (
            <Badge key={tech} variant="default" className="gap-1">
              {tech}
              <button type="button" onClick={() => removeTech(tech)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>
        {technologies.map((tech) => (
          <input key={tech} type="hidden" name="technologies" value={tech} />
        ))}
      </div>

      <Textarea
        label="Content (Markdown)"
        name="content"
        defaultValue={project?.content ?? ""}
        className="min-h-[200px] font-mono text-sm"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          label="Cover Image URL"
          name="coverImage"
          defaultValue={project?.coverImage ?? ""}
        />
        <Input
          label="GitHub URL"
          name="githubUrl"
          defaultValue={project?.githubUrl ?? ""}
        />
        <Input
          label="Live Demo URL"
          name="liveUrl"
          defaultValue={project?.liveUrl ?? ""}
        />
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
            Status
          </label>
          <Select name="status" defaultValue={project?.status ?? "completed"}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
          <input
            type="checkbox"
            name="featured"
            value="true"
            defaultChecked={project?.featured}
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-300">
          <input
            type="checkbox"
            name="pinned"
            value="true"
            defaultChecked={project?.pinned}
          />
          Pinned
        </label>
      </div>

      <div className="flex gap-3 pt-4">
        <Button type="submit" disabled={pending}>
          {pending
            ? "Saving..."
            : project
              ? "Update Project"
              : "Create Project"}
        </Button>
        <Button
          type="button"
          variant="secondary"
          onClick={() => router.push("/admin/projects")}
        >
          Cancel
        </Button>
      </div>
    </form>
  )
}
