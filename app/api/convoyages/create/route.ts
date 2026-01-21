import { convoyageStore } from '@/lib/convoyage-store'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const convoyage = convoyageStore.createConvoyage(data)
    return Response.json(convoyage, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating convoyage:', error)
    return Response.json({ error: 'Failed to create convoyage' }, { status: 500 })
  }
}
