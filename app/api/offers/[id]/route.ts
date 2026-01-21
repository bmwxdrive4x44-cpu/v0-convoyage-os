import { convoyageStore } from '@/lib/convoyage-store'

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const { status } = await req.json()

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return Response.json({ error: 'Invalid status' }, { status: 400 })
    }

    const offer = convoyageStore.updateOfferStatus(id, status)

    if (!offer) {
      return Response.json({ error: 'Offer not found' }, { status: 404 })
    }

    return Response.json(offer)
  } catch (error) {
    console.error('[v0] Error updating offer:', error)
    return Response.json({ error: 'Failed to update offer' }, { status: 500 })
  }
}
