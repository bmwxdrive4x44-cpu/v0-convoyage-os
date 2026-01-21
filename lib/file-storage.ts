// File storage service - simulates file storage with in-memory store
interface StoredFile {
  id: string
  name: string
  mimeType: string
  size: number
  uploadedAt: string
  data: Buffer
}

class FileStorageService {
  private files: Map<string, StoredFile> = new Map()
  private nextId = 1

  uploadFile(file: File, driverId: string, docId: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()

      reader.onload = () => {
        const fileId = `${driverId}_${docId}_${this.nextId++}`
        const buffer = Buffer.from(reader.result as ArrayBuffer)

        const storedFile: StoredFile = {
          id: fileId,
          name: file.name,
          mimeType: file.type,
          size: file.size,
          uploadedAt: new Date().toISOString(),
          data: buffer,
        }

        this.files.set(fileId, storedFile)
        console.log(`[v0] File uploaded: ${file.name} (ID: ${fileId})`)
        resolve(fileId)
      }

      reader.onerror = () => {
        reject(new Error("Failed to read file"))
      }

      reader.readAsArrayBuffer(file)
    })
  }

  getFile(fileId: string): StoredFile | null {
    return this.files.get(fileId) || null
  }

  deleteFile(fileId: string): boolean {
    return this.files.delete(fileId)
  }

  listFiles(driverId: string): StoredFile[] {
    return Array.from(this.files.values()).filter((f) => f.id.startsWith(driverId))
  }
}

export const fileStorage = new FileStorageService()
