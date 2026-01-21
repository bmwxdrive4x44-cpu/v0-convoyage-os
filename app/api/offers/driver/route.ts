import { convoyageStore } from '@/lib/convoyage-store'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const driverId = searchParams.get('driverId')

  if (!driverId) {
    return Response.json({ error: 'driverId is required' }, { status: 400 })
  }

  const offers = convoyageStore.getOffersByDriverId(driverId)
  return Response.json(offers)
}
