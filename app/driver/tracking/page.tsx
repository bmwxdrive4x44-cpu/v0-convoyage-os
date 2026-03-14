'use client'

import { DashboardLayout } from "@/components/dashboard/dashboard-layout"
import { LocationTracker } from "@/components/driver/location-tracker"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, AlertCircle, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

interface ActiveMission {
  id: string
  vehicle: string
  pickupLocation: string
  deliveryLocation: string
  status: string
  startTime?: string
}

export default function DriverTrackingPage() {
  const [activeMission, setActiveMission] = useState<ActiveMission | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchActiveMission = async () => {
      try {
        const response = await fetch('/api/offers/driver/route')
        
        if (!response.ok) {
          throw new Error('Failed to load mission')
        }

        const data = await response.json()
        // Get the first active mission
        const mission = data.missions?.find((m: any) => m.status === 'in-progress')
        setActiveMission(mission || null)
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading mission')
      } finally {
        setIsLoading(false)
      }
    }

    fetchActiveMission()
  }, [])

  if (isLoading) {
    return (
      <DashboardLayout role="driver">
        <div className="space-y-6">
          <h1 className="text-3xl font-bold text-foreground">GPS Tracking</h1>
          <Card className="bg-card">
            <CardContent className="py-12">
              <p className="text-muted-foreground text-center">Loading mission details...</p>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout role="driver">
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-foreground">GPS Tracking</h1>

        {error && (
          <Card className="bg-card border-destructive/20">
            <CardContent className="py-6 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
              <p className="text-destructive text-sm">{error}</p>
            </CardContent>
          </Card>
        )}

        {activeMission ? (
          <>
            {/* Active Mission Info */}
            <Card className="bg-card border-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    Active Mission
                  </CardTitle>
                  <Badge className="bg-green-500/10 text-green-600 border-green-200">
                    In Progress
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Vehicle</p>
                    <p className="font-medium">{activeMission.vehicle}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Started</p>
                    <p className="font-medium">{activeMission.startTime || 'Just now'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <p className="text-sm text-muted-foreground mb-2">Route</p>
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-foreground">{activeMission.pickupLocation}</span>
                      <span className="text-muted-foreground">→</span>
                      <span className="text-foreground">{activeMission.deliveryLocation}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Location Tracker */}
            <LocationTracker
              missionId={activeMission.id}
              driverId="current-driver"
              onLocationUpdate={(lat, lng) => {
                console.log('[v0] Location updated:', { lat, lng })
              }}
            />

            {/* Tracking Tips */}
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Tracking Tips</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                    1
                  </div>
                  <div>
                    <p className="text-sm font-medium">Enable High Accuracy</p>
                    <p className="text-xs text-muted-foreground">
                      Make sure GPS is enabled on your device for best results
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                    2
                  </div>
                  <div>
                    <p className="text-sm font-medium">Keep App in Focus</p>
                    <p className="text-xs text-muted-foreground">
                      For continuous tracking, keep the app window open
                    </p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-xs font-semibold text-primary flex-shrink-0">
                    3
                  </div>
                  <div>
                    <p className="text-sm font-medium">Check Accuracy</p>
                    <p className="text-xs text-muted-foreground">
                      Monitor the accuracy reading - lower is more precise (±meters)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ) : (
          <Card className="bg-card">
            <CardContent className="py-12 text-center">
              <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="font-medium text-foreground mb-2">No Active Missions</h3>
              <p className="text-sm text-muted-foreground">
                You don't have any active missions right now. Check available missions to get started.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
