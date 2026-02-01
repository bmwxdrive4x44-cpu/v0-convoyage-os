import { NextResponse } from "next/server"

// In-memory storage for mission tracking
const missionTracking = new Map<
  string,
  {
    missionId: string
    driverId: string
    status: "in-progress" | "completed" | "paused"
    startLocation: { latitude: number; longitude: number }
    currentLocation: { latitude: number; longitude: number }
    endLocation: { latitude: number; longitude: number }
    distance: number // kilometers
    estimatedTimeRemaining: number // minutes
    startTime: number
    updatedAt: number
  }
>()

export async function GET(
  request: Request,
  { params }: { params: { missionId: string } }
) {
  try {
    const missionId = params.missionId

    const tracking = missionTracking.get(missionId)

    if (!tracking) {
      return NextResponse.json(
        { error: "No tracking data found for this mission" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      {
        success: true,
        tracking,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Error retrieving mission tracking:", error)
    return NextResponse.json(
      { error: "Failed to retrieve mission tracking" },
      { status: 500 }
    )
  }
}

export async function POST(
  request: Request,
  { params }: { params: { missionId: string } }
) {
  try {
    const missionId = params.missionId
    const {
      driverId,
      status,
      currentLocation,
      distance,
      estimatedTimeRemaining,
      startLocation,
      endLocation,
    } = await request.json()

    if (!driverId || !currentLocation) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    const tracking = {
      missionId,
      driverId,
      status: status || "in-progress",
      startLocation: startLocation || { latitude: 0, longitude: 0 },
      currentLocation,
      endLocation: endLocation || { latitude: 0, longitude: 0 },
      distance: distance || 0,
      estimatedTimeRemaining: estimatedTimeRemaining || 0,
      startTime: missionTracking.get(missionId)?.startTime || Date.now(),
      updatedAt: Date.now(),
    }

    missionTracking.set(missionId, tracking)
    console.log("[v0] Mission tracking updated:", missionId)

    return NextResponse.json(
      {
        success: true,
        tracking,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("[v0] Error updating mission tracking:", error)
    return NextResponse.json(
      { error: "Failed to update mission tracking" },
      { status: 500 }
    )
  }
}
