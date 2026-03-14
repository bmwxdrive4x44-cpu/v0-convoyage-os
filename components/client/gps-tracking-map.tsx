'use client'

import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { MapPin, Navigation, Clock, AlertCircle, Wifi, WifiOff } from 'lucide-react'

interface DriverLocation {
  latitude: number
  longitude: number
  accuracy: number
  timestamp: string
  speed?: number
}

interface GPSTrackingMapProps {
  missionId: string
  driverId?: string
}

export function GPSTrackingMap({ missionId, driverId }: GPSTrackingMapProps) {
  const [location, setLocation] = useState<DriverLocation | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    // Fetch initial location
    const fetchMissionLocation = async () => {
      try {
        const response = await fetch(`/api/tracking/mission/${missionId}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch location')
        }

        const data = await response.json()
        setLocation(data.location)
        setLastUpdated(new Date())
        setError(null)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error loading location')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMissionLocation()

    // Attempt WebSocket connection for real-time updates
    const connectWebSocket = () => {
      try {
        const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:'
        const ws = new WebSocket(`${protocol}//${window.location.host}/api/tracking/ws?missionId=${missionId}`)
        
        ws.onopen = () => {
          console.log('[v0] WebSocket connected')
          setIsConnected(true)
        }

        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            if (data.location) {
              setLocation(data.location)
              setLastUpdated(new Date())
            }
          } catch (err) {
            console.error('[v0] Error parsing WebSocket message:', err)
          }
        }

        ws.onerror = () => {
          console.error('[v0] WebSocket error')
          setIsConnected(false)
        }

        ws.onclose = () => {
          console.log('[v0] WebSocket disconnected')
          setIsConnected(false)
          // Attempt to reconnect after 3 seconds
          setTimeout(connectWebSocket, 3000)
        }

        wsRef.current = ws
      } catch (err) {
        console.error('[v0] WebSocket connection error:', err)
        setIsConnected(false)
      }
    }

    connectWebSocket()

    // Fallback: Poll for location updates every 5 seconds if WebSocket fails
    const pollInterval = setInterval(fetchMissionLocation, 5000)

    return () => {
      clearInterval(pollInterval)
      if (wsRef.current) {
        wsRef.current.close()
      }
    }
  }, [missionId])

  const getMapEmbedUrl = () => {
    if (!location) return null
    const zoom = 15
    const size = '600x400'
    const marker = `${location.latitude},${location.longitude}`
    
    // Using OpenStreetMap/Leaflet compatible format
    return `/map?lat=${location.latitude}&lng=${location.longitude}&zoom=${zoom}`
  }

  const getGoogleMapsUrl = () => {
    if (!location) return null
    return `https://www.google.com/maps?q=${location.latitude},${location.longitude}`
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  return (
    <Card className="bg-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Navigation className="h-5 w-5 text-primary" />
            Live GPS Tracking
          </CardTitle>
          <div className="flex items-center gap-2">
            {location && (
              <Badge variant="outline" className="flex items-center gap-1">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
                Active
              </Badge>
            )}
            <Badge variant="outline" className="flex items-center gap-1">
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3 text-primary" />
                  Live
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 text-muted-foreground" />
                  Polling
                </>
              )}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 flex items-start gap-2">
            <AlertCircle className="h-5 w-5 text-destructive mt-0.5 flex-shrink-0" />
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="h-80 rounded-lg bg-secondary/50 flex items-center justify-center">
            <p className="text-muted-foreground">Loading location...</p>
          </div>
        ) : location ? (
          <>
            {/* Map placeholder - Replace with actual map library */}
            <div className="h-80 w-full rounded-lg bg-secondary/50 flex flex-col items-center justify-center border border-border">
              <MapPin className="h-8 w-8 text-primary mb-2" />
              <p className="text-sm text-muted-foreground text-center">
                GPS Location: {location.latitude.toFixed(4)}°, {location.longitude.toFixed(4)}°
              </p>
              <a
                href={getGoogleMapsUrl() || '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 text-xs text-primary hover:underline"
              >
                View on Google Maps
              </a>
            </div>

            {/* Location details */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Latitude</p>
                <p className="font-mono text-sm">{location.latitude.toFixed(6)}°</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Longitude</p>
                <p className="font-mono text-sm">{location.longitude.toFixed(6)}°</p>
              </div>
              <div className="p-3 rounded-lg bg-secondary/50">
                <p className="text-xs text-muted-foreground mb-1">Accuracy</p>
                <p className="text-sm">±{location.accuracy.toFixed(0)}m</p>
              </div>
              {location.speed !== undefined && (
                <div className="p-3 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Speed</p>
                  <p className="text-sm">{(location.speed * 3.6).toFixed(1)} km/h</p>
                </div>
              )}
            </div>

            {/* Last updated */}
            {lastUpdated && (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-4 w-4" />
                Last updated: {formatTime(lastUpdated)}
              </div>
            )}
          </>
        ) : (
          <div className="h-80 rounded-lg bg-secondary/50 flex items-center justify-center">
            <p className="text-muted-foreground">No location data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
