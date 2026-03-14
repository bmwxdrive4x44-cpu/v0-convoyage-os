'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, MapPin, Pause, Play, Loader2 } from 'lucide-react'

interface LocationTrackerProps {
  missionId: string
  driverId: string
  onLocationUpdate?: (lat: number, lng: number) => void
}

export function LocationTracker({ missionId, driverId, onLocationUpdate }: LocationTrackerProps) {
  const [isTracking, setIsTracking] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [accuracy, setAccuracy] = useState<number | null>(null)
  const watchIdRef = useRef<number | null>(null)

  const startTracking = async () => {
    setIsLoading(true)
    setError(null)

    // Check if geolocation is available
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      setIsLoading(false)
      return
    }

    // Request permission and start watching location
    const watchId = navigator.geolocation.watchPosition(
      async (position) => {
        const { latitude, longitude, accuracy: gpsAccuracy } = position.coords

        setLocation({ lat: latitude, lng: longitude })
        setAccuracy(gpsAccuracy)
        setIsTracking(true)
        setIsLoading(false)

        // Call the callback if provided
        if (onLocationUpdate) {
          onLocationUpdate(latitude, longitude)
        }

        // Send location to backend
        try {
          const response = await fetch('/api/tracking/location', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              missionId,
              driverId,
              latitude,
              longitude,
              accuracy: gpsAccuracy,
            }),
          })

          if (!response.ok) {
            console.error('[v0] Failed to send location to server')
          }
        } catch (err) {
          console.error('[v0] Error sending location:', err)
        }
      },
      (err) => {
        setError(`GPS Error: ${err.message}`)
        setIsLoading(false)
        setIsTracking(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    )

    watchIdRef.current = watchId
  }

  const stopTracking = () => {
    if (watchIdRef.current !== null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    setIsTracking(false)
  }

  useEffect(() => {
    return () => {
      if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [])

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="h-5 w-5 text-primary" />
          Location Tracking
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {location && (
          <div className="space-y-2 p-3 rounded-lg bg-secondary/50">
            <p className="text-sm text-muted-foreground">Current Location</p>
            <p className="text-sm font-mono">
              Lat: {location.lat.toFixed(6)}° | Lng: {location.lng.toFixed(6)}°
            </p>
            {accuracy && (
              <p className="text-xs text-muted-foreground">
                Accuracy: ±{accuracy.toFixed(0)}m
              </p>
            )}
          </div>
        )}

        <div className="flex gap-2">
          {!isTracking ? (
            <Button
              onClick={startTracking}
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Starting...
                </>
              ) : (
                <>
                  <Play className="h-4 w-4 mr-2" />
                  Start Tracking
                </>
              )}
            </Button>
          ) : (
            <Button
              onClick={stopTracking}
              variant="destructive"
              className="flex-1"
            >
              <Pause className="h-4 w-4 mr-2" />
              Stop Tracking
            </Button>
          )}
        </div>

        {isTracking && (
          <div className="flex items-center gap-2 text-sm text-primary">
            <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            Tracking active
          </div>
        )}
      </CardContent>
    </Card>
  )
}
