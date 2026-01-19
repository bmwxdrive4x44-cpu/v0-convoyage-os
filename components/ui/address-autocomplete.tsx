"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { MapPin, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface AddressSuggestion {
  place_id: number
  display_name: string
  address: {
    road?: string
    house_number?: string
    city?: string
    town?: string
    village?: string
    postcode?: string
    country?: string
    state?: string
  }
  lat: string
  lon: string
}

interface AddressAutocompleteProps {
  value: string
  onChange: (value: string) => void
  onSelect?: (suggestion: {
    address: string
    city: string
    postalCode: string
    lat: number
    lon: number
  }) => void
  placeholder?: string
  className?: string
  id?: string
  required?: boolean
}

export function AddressAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder = "Rechercher une adresse...",
  className,
  id,
  required,
}: AddressAutocompleteProps) {
  const [suggestions, setSuggestions] = useState<AddressSuggestion[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const wrapperRef = useRef<HTMLDivElement>(null)
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  // Recherche d'adresses via Nominatim (OpenStreetMap)
  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setSuggestions([])
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=fr&addressdetails=1&limit=5`,
        {
          headers: {
            "Accept-Language": "fr",
          },
        },
      )
      const data: AddressSuggestion[] = await response.json()
      setSuggestions(data)
      setIsOpen(data.length > 0)
      setSelectedIndex(-1)
    } catch (error) {
      console.error("Erreur lors de la recherche d'adresse:", error)
      setSuggestions([])
    } finally {
      setIsLoading(false)
    }
  }

  // Debounce pour éviter trop de requêtes
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      searchAddress(value)
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [value])

  // Fermer le dropdown quand on clique en dehors
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleSelect = (suggestion: AddressSuggestion) => {
    const city = suggestion.address.city || suggestion.address.town || suggestion.address.village || ""
    const postalCode = suggestion.address.postcode || ""
    const streetNumber = suggestion.address.house_number || ""
    const street = suggestion.address.road || ""
    const address = streetNumber ? `${streetNumber} ${street}` : street || suggestion.display_name.split(",")[0]

    onChange(address)
    setIsOpen(false)

    if (onSelect) {
      onSelect({
        address,
        city,
        postalCode,
        lat: Number.parseFloat(suggestion.lat),
        lon: Number.parseFloat(suggestion.lon),
      })
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (selectedIndex >= 0 && selectedIndex < suggestions.length) {
          handleSelect(suggestions[selectedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        break
    }
  }

  return (
    <div ref={wrapperRef} className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setIsOpen(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn("pl-10 pr-10", className)}
          required={required}
          autoComplete="off"
        />
        {isLoading && (
          <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground animate-spin" />
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto">
          {suggestions.map((suggestion, index) => (
            <button
              key={suggestion.place_id}
              type="button"
              onClick={() => handleSelect(suggestion)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-secondary/80 transition-colors flex items-start gap-3 border-b border-border last:border-b-0",
                index === selectedIndex && "bg-secondary",
              )}
            >
              <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {suggestion.address.house_number} {suggestion.address.road || suggestion.display_name.split(",")[0]}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {suggestion.address.postcode}{" "}
                  {suggestion.address.city || suggestion.address.town || suggestion.address.village}
                  {suggestion.address.state && `, ${suggestion.address.state}`}
                </p>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
