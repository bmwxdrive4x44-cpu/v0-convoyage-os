import { convoyageStore } from '@/lib/convoyage-store'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    const offer = convoyageStore.createOffer(data)
    return Response.json(offer, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating offer:', error)
    return Response.json({ error: 'Failed to create offer' }, { status: 500 })
  }
}
