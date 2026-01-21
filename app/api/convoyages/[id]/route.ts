import { convoyageStore } from '@/lib/convoyage-store'

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const convoyage = convoyageStore.getConvoyageById(id)

  if (!convoyage) {
    return Response.json({ error: 'Convoyage not found' }, { status: 404 })
  }

  return Response.json(convoyage)
}
