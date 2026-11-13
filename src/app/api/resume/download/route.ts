import { NextResponse } from "next/server"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const requestedId = requestUrl.searchParams.get("id")
  const disposition = requestUrl.searchParams.get("inline") === "1" ? "inline" : "attachment"
  const { prisma } = await import("@/lib/prisma")

  // Historical resume versions are only available to authenticated admins.
  if (requestedId) {
    const { auth } = await import("@/lib/auth")
    const session = await auth()

    if (session?.user?.role !== "admin") {
      return NextResponse.json({ error: "Not authorized" }, { status: 403 })
    }
  }

  const resume = await prisma.resume.findFirst({
    where: requestedId ? { id: requestedId } : { isCurrent: true },
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
  const isAllowedBlobHost = hostname.endsWith(".public.blob.vercel-storage.com")

  // Resume files are stored in the app's configured Vercel Blob storage.
  // Restrict the proxy to that host to prevent server-side request forgery.
  if (
    fileUrl.protocol !== "https:" ||
    !isAllowedBlobHost ||
    fileUrl.username ||
    fileUrl.password ||
    fileUrl.port
  ) {
    return NextResponse.json({ error: "Resume URL must be a public Vercel Blob URL" }, { status: 400 })
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
        "Content-Disposition": `${disposition}; filename="Srinivasan-Resume.pdf"; filename*=UTF-8''Srinivasan-Resume.pdf`,
        "Cache-Control": "private, no-store",
        "X-Content-Type-Options": "nosniff",
      },
    })
  } catch {
    return NextResponse.json({ error: "Unable to download resume from its storage URL" }, { status: 502 })
  }
}
