/// <reference types="react-scripts" />

namespace App {
  type Place = {
    name: string
    latitude: number
    longitude: number
    type: string
    start_date: string
    end_date: string | null
    description: string
  }

  type PlaceSelected = Place | null

  type PlaceListFilter = {
    name: string
    value: any
  }

  type MapboxMarker = {
    latitude: number
    longitude: number
    description: string
  }
}
