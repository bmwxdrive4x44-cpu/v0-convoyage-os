import { NextResponse } from "next/server"

// In-memory storage for driver locations
const driverLocations = new Map<
  string,
  {
    latitude: number
    longitude: number
    accuracy: number
    timestamp: number
    speed?: number
  }
>()

export async function POST(request: Request) {
  try {
    const { driverId, latitude, longitude, accuracy, speed } = await request.json()

    if (!driverId || latitude === undefined || longitude === undefined) {
      return NextResponse.json(
        { error: "Missing required fields: driverId, latitude, longitude" },
        { status: 400 }
      )
    }

    // Validate coordinates
    if (latitude < -90 || latitude > 90 || longitude < -180 || longitude > 180) {
      return NextResponse.json(
        { error: "Invalid latitude or longitude" },
        { status: 400 }
      )
    }

    const location = {
      latitude,
      longitude,
      accuracy: accuracy || 10,
      timestamp: Date.now(),
      speed: speed || 0,
    }

    driverLocations.set(driverId, location)
    console.log("[v0] Location updated for driver:", driverId, location)

    return NextResponse.json(
      {
        success: true,
        message: "Location updated",
        location,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Error updating location:", error)
    return NextResponse.json(
      { error: "Failed to update location" },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const driverId = searchParams.get("driverId")

    if (!driverId) {
      return NextResponse.json(
        { error: "Missing driverId parameter" },
        { status: 400 }
      )
    }

    const location = driverLocations.get(driverId)

    if (!location) {
      return NextResponse.json(
        { error: "No location found for this driver" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        location,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Error retrieving location:", error)
    return NextResponse.json(
      { error: "Failed to retrieve location" },
      { status: 500 }
    )
  }
}
