// In-memory storage for convoyages and offers
export interface ConvoyageData {
  id: string
  clientId: string
  vehicleBrand: string
  vehicleModel: string
  vehicleType: string
  vehiclePlate: string
  pickupAddress: string
  pickupCity: string
  pickupPostalCode: string
  pickupLat: number | null
  pickupLon: number | null
  deliveryAddress: string
  deliveryCity: string
  deliveryPostalCode: string
  deliveryLat: number | null
  deliveryLon: number | null
  preferredDate: string
  flexibleDates: string
  notes: string
  status: 'open' | 'assigned' | 'completed'
  createdAt: string
  estimatedDistance?: number
}

export interface OfferData {
  id: string
  convoyageId: string
  driverId: string
  driverName: string
  driverRating: number
  proposedPrice: number
  estimatedDuration: string
  message: string
  status: 'pending' | 'accepted' | 'rejected'
  createdAt: string
}

// Simulated database
let convoyages: ConvoyageData[] = []
let offers: OfferData[] = []

export const convoyageStore = {
  createConvoyage: (data: Omit<ConvoyageData, 'id' | 'status' | 'createdAt'>) => {
    const id = `conv_${Date.now()}`
    const newConvoyage: ConvoyageData = {
      ...data,
      id,
      status: 'open',
      createdAt: new Date().toISOString(),
      estimatedDistance: Math.floor(Math.random() * 500) + 50,
    }
    convoyages.push(newConvoyage)
    console.log("[v0] Created convoyage:", id)
    return newConvoyage
  },

  getConvoyageById: (id: string) => {
    return convoyages.find((c) => c.id === id)
  },

  getConvoyagesByClientId: (clientId: string) => {
    return convoyages.filter((c) => c.clientId === clientId)
  },

  getAllOpenConvoyages: () => {
    return convoyages.filter((c) => c.status === 'open')
  },

  updateConvoyageStatus: (id: string, status: 'open' | 'assigned' | 'completed') => {
    const convoyage = convoyages.find((c) => c.id === id)
    if (convoyage) {
      convoyage.status = status
      console.log("[v0] Updated convoyage status:", id, status)
    }
    return convoyage
  },

  createOffer: (data: Omit<OfferData, 'id' | 'status' | 'createdAt'>) => {
    const id = `offer_${Date.now()}`
    const newOffer: OfferData = {
      ...data,
      id,
      status: 'pending',
      createdAt: new Date().toISOString(),
    }
    offers.push(newOffer)
    console.log("[v0] Created offer:", id)
    return newOffer
  },

  getOffersByConvoyageId: (convoyageId: string) => {
    return offers.filter((o) => o.convoyageId === convoyageId)
  },

  getOffersByDriverId: (driverId: string) => {
    return offers.filter((o) => o.driverId === driverId)
  },

  updateOfferStatus: (id: string, status: 'pending' | 'accepted' | 'rejected') => {
    const offer = offers.find((o) => o.id === id)
    if (offer) {
      offer.status = status
      if (status === 'accepted') {
        const convoyage = convoyages.find((c) => c.id === offer.convoyageId)
        if (convoyage) {
          convoyage.status = 'assigned'
        }
      }
      console.log("[v0] Updated offer status:", id, status)
    }
    return offer
  },

  getAllConvoyages: () => convoyages,
  getAllOffers: () => offers,
}
