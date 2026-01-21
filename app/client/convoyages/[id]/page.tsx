import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { ConvoyageDetailView } from "@/components/client/convoyage-detail-view"

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function ConvoyageDetailPage({ params }: PageProps) {
  const { id } = await params

  return (
    <DashboardLayout role="client">
      <ConvoyageDetailView convoyageId={id} />
    </DashboardLayout>
  )
}
