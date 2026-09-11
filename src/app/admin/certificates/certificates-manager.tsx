"use client"

import { useActionState } from "react"
import { createCertificateAction, deleteCertificateAction } from "@/actions/certificates"
import { Button, Input, Textarea, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui"
import { formatDate } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"

export function CertificatesManager({ certificates }: { certificates: any[] }) {
  const [state, action, pending] = useActionState(createCertificateAction, null)
  const errors = state?.errors as Record<string, string[]> | undefined

  return (
    <div className="space-y-4">
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Add Certificate
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New Certificate</DialogTitle>
          </DialogHeader>
          <form action={action} className="space-y-3">
            <Input name="title" label="Title" error={errors?.title?.[0]} />
            <Input name="issuer" label="Issuer" error={errors?.issuer?.[0]} />
            <Input name="verificationUrl" label="Verification URL" />
            <Input name="imageUrl" label="Image URL" />
            <div className="grid grid-cols-2 gap-3">
              <Input name="issueDate" label="Issue Date" type="date" />
              <Input name="expiryDate" label="Expiry Date" type="date" />
            </div>
            <Textarea name="description" label="Description" />
            <Button type="submit" disabled={pending}>Add Certificate</Button>
          </form>
        </DialogContent>
      </Dialog>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((cert) => (
          <div key={cert.id} className="rounded-xl border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-medium text-neutral-900 dark:text-neutral-100">{cert.title}</h3>
                <p className="text-sm text-neutral-500">{cert.issuer}</p>
                {cert.issueDate && (
                  <p className="mt-1 text-xs text-neutral-400">{formatDate(cert.issueDate)}</p>
                )}
              </div>
              <form action={async () => { await deleteCertificateAction(cert.id) }}>
                <button type="submit" className="text-neutral-400 hover:text-red-500">
                  <Trash2 className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
