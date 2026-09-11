import { prisma } from "@/lib/prisma"
import { CertificatesManager } from "./certificates-manager"

export const dynamic = "force-dynamic"

export default async function AdminCertificatesPage() {
  const certificates = await prisma.certificate.findMany({
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-100">
          Certificates
        </h2>
        <p className="mt-1 text-sm text-neutral-500">
          Manage your certifications and credentials
        </p>
      </div>
      <CertificatesManager certificates={certificates} />
    </div>
  )
}
