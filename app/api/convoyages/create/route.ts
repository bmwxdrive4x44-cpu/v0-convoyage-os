import { convoyageStore } from '@/lib/convoyage-store'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const data = await req.json()
    console.log('[v0] Creating convoyage with data:', {
      vehicleBrand: data.vehicleBrand,
      pickupCity: data.pickupCity,
      deliveryCity: data.deliveryCity,
    })

    // Validate required fields
    const requiredFields = [
      'vehicleBrand',
      'vehicleModel',
      'vehicleType',
      'vehiclePlate',
      'pickupAddress',
      'pickupCity',
      'pickupPostalCode',
      'deliveryAddress',
      'deliveryCity',
      'deliveryPostalCode',
      'preferredDate',
      'flexibleDates',
    ]

    const missingFields = requiredFields.filter((field) => !data[field])
    if (missingFields.length > 0) {
      console.error('[v0] Missing required fields:', missingFields)
      return NextResponse.json(
        { error: `Champs manquants: ${missingFields.join(', ')}` },
        { status: 400 }
      )
    }

    // Add default clientId if not provided
    const convoyageData = {
      ...data,
      clientId: data.clientId || 'client_001',
    }

    const convoyage = convoyageStore.createConvoyage(convoyageData)
    console.log('[v0] Convoyage created successfully:', convoyage.id)
    
    return NextResponse.json(convoyage, { status: 201 })
  } catch (error) {
    console.error('[v0] Error creating convoyage:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create convoyage' },
      { status: 500 }
    )
  }
}
