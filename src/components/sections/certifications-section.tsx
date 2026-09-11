import { prisma } from "@/lib/prisma"
import { formatDate } from "@/lib/utils"
import { Badge, Card } from "@/components/ui"
import { ExternalLink, Award } from "lucide-react"

export async function CertificationsSection() {
  const certificates = await prisma.certificate.findMany({
    orderBy: [{ issueDate: "desc" }, { displayOrder: "asc" }],
  })

  if (certificates.length === 0) return null

  return (
    <section id="certifications" className="border-t border-neutral-200/50 dark:border-neutral-800/50">
      <div className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400">
          Certifications
        </h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => (
            <Card key={cert.id} className="p-5">
              <div className="flex items-start gap-3">
                <Award className="mt-0.5 h-5 w-5 flex-shrink-0 text-neutral-400" />
                <div>
                  <h3 className="font-medium text-neutral-900 dark:text-neutral-100">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-neutral-500">{cert.issuer}</p>
                  {cert.issueDate && (
                    <p className="mt-1 text-xs text-neutral-400">
                      Issued {formatDate(cert.issueDate)}
                      {cert.expiryDate && ` · Expires ${formatDate(cert.expiryDate)}`}
                    </p>
                  )}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    >
                      Verify <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
