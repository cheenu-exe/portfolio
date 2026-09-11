import { prisma } from "@/lib/prisma"

export async function AboutSection() {
  const about = await prisma.about.findFirst()

  if (!about) return null

  return (
    <section id="about" className="border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          About
        </h2>
        <div className="mt-4 grid gap-12 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300">
              {about.bio}
            </p>
            {about.headline && (
              <p className="mt-4 text-sm text-neutral-400">{about.headline}</p>
            )}
          </div>
          <div className="space-y-4">
            {about.location && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Location
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  {about.location}
                </p>
              </div>
            )}
            {about.email && (
              <div>
                <h3 className="text-xs font-medium uppercase tracking-wider text-neutral-400">
                  Email
                </h3>
                <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-300">
                  {about.email}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
