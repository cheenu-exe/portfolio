import { NextResponse } from "next/server"
import { isIP } from "node:net"
import { prisma } from "@/lib/prisma"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET() {
  const resume = await prisma.resume.findFirst({
    where: { isCurrent: true },
    orderBy: { createdAt: "desc" },
    select: { fileUrl: true },
  })

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 })
  }

  let fileUrl: URL
  try {
    fileUrl = new URL(resume.fileUrl)
  } catch {
    return NextResponse.json({ error: "Invalid resume URL" }, { status: 400 })
  }

  const hostname = fileUrl.hostname.toLowerCase()
  const isLocalHost =
    hostname === "localhost" ||
    hostname.endsWith(".localhost") ||
    hostname.endsWith(".local") ||
    hostname === "metadata.google.internal"

  // Only fetch public HTTPS URLs; reject IP literals and local hostnames.
  if (fileUrl.protocol !== "https:" || isIP(hostname) !== 0 || isLocalHost) {
    return NextResponse.json({ error: "Resume URL must be a public HTTPS URL" }, { status: 400 })
  }

  try {
    const response = await fetch(fileUrl, {
      cache: "no-store",
      redirect: "error",
    })

    if (!response.ok || !response.body) {
      return NextResponse.json({ error: "Unable to retrieve resume PDF" }, { status: 502 })
    }

    const contentType = response.headers.get("content-type")?.split(";")[0].trim().toLowerCase()
    const isPdf = contentType === "application/pdf" || fileUrl.pathname.toLowerCase().endsWith(".pdf")

    if (!isPdf) {
      return NextResponse.json({ error: "The current resume URL does not point to a PDF" }, { status: 415 })
    }

    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Srinivasan-Resume.pdf"; filename*=UTF-8\'\'Srinivasan-Resume.pdf',
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch {
    return NextResponse.json({ error: "Unable to download resume from its storage URL" }, { status: 502 })
  }
}
