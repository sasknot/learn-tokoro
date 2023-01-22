import { createContext, useState, ReactNode } from 'react'

interface MapContextData {
  longitude: number
  latitude: number
  zoom: number
  places: App.Place[]
  flyTo(newLatitude: number, newLongitude: number, newZoom?: number): void
}

interface MapProviderProps {
  children: ReactNode
  latitude: number
  longitude: number
  zoom: number
  places: App.Place[]
}

export const MapContext = createContext({} as MapContextData);

export function MapProvider (props: MapProviderProps) {
  const { children, places, ...defaults } = props
  const [latitude, setLatitude] = useState(defaults.latitude)
  const [longitude, setLongitude] = useState(defaults.longitude)
  const [zoom, setZoom] = useState(defaults.zoom)

  function flyTo (newLatitude: number, newLongitude: number, newZoom?: number) {
    setLatitude(newLatitude)
    setLongitude(newLongitude)

    if (newZoom) {
      setZoom(newZoom)
    }
    // @TODO: save to cookies last lat,lng
  }

  return (
    <MapContext.Provider
      value={{
        longitude,
        latitude,
        zoom,
        places,
        flyTo
      }}
    >
      {children}
    </MapContext.Provider>
  )
}
