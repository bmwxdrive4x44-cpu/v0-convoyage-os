import { convoyageStore } from '@/lib/convoyage-store'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const convoyageId = searchParams.get('convoyageId')

  if (!convoyageId) {
    return Response.json({ error: 'convoyageId is required' }, { status: 400 })
  }

  const offers = convoyageStore.getOffersByConvoyageId(convoyageId)
  return Response.json(offers)
}
