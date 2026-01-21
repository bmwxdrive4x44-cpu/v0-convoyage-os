import { convoyageStore } from '@/lib/convoyage-store'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const clientId = searchParams.get('clientId')

  if (!clientId) {
    return Response.json({ error: 'clientId is required' }, { status: 400 })
  }

  const convoyages = convoyageStore.getConvoyagesByClientId(clientId)
  return Response.json(convoyages)
}
