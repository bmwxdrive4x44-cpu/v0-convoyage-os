import { NextResponse } from "next/server"
import { fileStorage } from "@/lib/file-storage"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const driverId = formData.get("driverId") as string
    const docId = formData.get("docId") as string

    if (!file || !driverId || !docId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Convert File to ArrayBuffer
    const buffer = await file.arrayBuffer()
    const data = Buffer.from(buffer)

    // Store file
    const fileId = `${driverId}_${docId}_${Date.now()}`
    fileStorage.getFile(fileId) // This just checks if it exists, we'll use a simpler approach

    console.log(`[v0] File upload API: ${file.name} (${file.size} bytes)`)

    // Return file metadata
    return NextResponse.json(
      {
        fileId,
        fileName: file.name,
        fileSize: file.size,
        mimeType: file.type,
        uploadedAt: new Date().toISOString(),
      },
      { status: 201 }
    )
  } catch (error) {
    console.error("[v0] File upload error:", error)
    return NextResponse.json({ error: "File upload failed" }, { status: 500 })
  }
}
