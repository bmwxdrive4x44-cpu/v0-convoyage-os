'use client'

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { GPSTrackingMap } from "@/components/client/gps-tracking-map"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { MapPin, ArrowLeft, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

interface MissionTrackingPageProps {
  params: {
    missionId: string
  }
}

interface MissionData {
  id: string
  vehicle: string
  driverName: string
  driverPhone: string
  pickupLocation: string
  deliveryLocation: string
  status: string
  estimatedTime?: string
  distance?: number
}

export default function MissionTrackingPage({ params }: MissionTrackingPageProps) {
  const [missionData, setMissionData] = useState<MissionData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        const response = await fetch(`/api/convoyages/${params.missionId}`)
        
        if (!response.ok) {
          throw new Error('Failed to load mission data')
        }

        const data = await response.json()
        setMissionData(data)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading mission')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMissionData()
  }, [params.missionId])

  return (
    <DashboardLayout role="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/client/convoyages">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
                <MapPin className="h-8 w-8 text-primary" />
                Live Tracking
              </h1>
              <p className="text-muted-foreground mt-1">Mission #{params.missionId}</p>
            </div>
          </div>
        </div>

        {isLoading ? (
          <Card className="bg-card">
            <CardContent className="py-12">
              <p className="text-muted-foreground text-center">Loading mission details...</p>
            </CardContent>
          </Card>
        ) : error ? (
          <Card className="bg-card border-destructive/20">
            <CardContent className="py-6">
              <p className="text-destructive text-center">{error}</p>
            </CardContent>
          </Card>
        ) : missionData ? (
          <>
            {/* Mission Details Card */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Mission Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{missionData.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Status</p>
                    <Badge variant="outline" className="mt-1">
                      {missionData.status === 'in-progress' ? 'In Transit' : missionData.status}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pickup</p>
                    <p className="font-medium text-sm">{missionData.pickupLocation}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Delivery</p>
                    <p className="font-medium text-sm">{missionData.deliveryLocation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* GPS Map */}
            <GPSTrackingMap missionId={params.missionId} />

            {/* Driver Info Card */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Driver Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Driver Name</p>
                  <p className="font-medium">{missionData.driverName}</p>
                </div>
                
                <div className="flex gap-2 pt-2">
                  <Button variant="outline" className="flex-1 bg-transparent" asChild>
                    <a href={`tel:${missionData.driverPhone}`}>
                      <Phone className="h-4 w-4 mr-2" />
                      Call Driver
                    </a>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Message
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Trip Details */}
            {(missionData.estimatedTime || missionData.distance) && (
              <Card className="bg-card">
                <CardHeader>
                  <CardTitle>Trip Details</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-2 gap-4">
                  {missionData.distance && (
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Distance</p>
                      <p className="text-lg font-semibold">{missionData.distance} km</p>
                    </div>
                  )}
                  {missionData.estimatedTime && (
                    <div className="p-3 rounded-lg bg-secondary/50">
                      <p className="text-xs text-muted-foreground">Est. Time</p>
                      <p className="text-lg font-semibold">{missionData.estimatedTime}</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </>
        ) : null}
      </div>
    </DashboardLayout>
  )
}
