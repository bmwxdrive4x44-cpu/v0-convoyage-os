import { NextResponse } from "next/server"
import { fileStorage } from "@/lib/file-storage"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get("file") as File
    const driverId = formData.get("driverId") as string
    const docId = formData.get("docId") as string

    if (!file || !driverId || !docId) {
      console.error("[v0] Missing required fields:", { file: !!file, driverId, docId })
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    console.log(`[v0] Uploading file: ${file.name} (${file.size} bytes) for ${driverId}/${docId}`)

    // Store file using the file storage service
    const fileId = await fileStorage.uploadFile(file, driverId, docId)

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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "File upload failed" },
      { status: 500 }
    )
  }
}
