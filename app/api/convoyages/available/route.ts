import { convoyageStore } from '@/lib/convoyage-store'

export async function GET() {
  const convoyages = convoyageStore.getAllOpenConvoyages()
  return Response.json(convoyages)
}
