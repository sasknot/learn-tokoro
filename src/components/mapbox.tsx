import React, { useRef, useEffect, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

mapboxgl.accessToken = String(process.env.REACT_APP_MAPBOX_TOKEN)

interface MapboxProps {
  latitude: number
  longitude: number
  zoom: number
  places?: App.MapboxMarker[]
}

export default function Mapbox (props: MapboxProps) {
  const { latitude, longitude, zoom, places = [] } = props
  const mapContainer = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<mapboxgl.Map>()

  function renderInitialMap () {
    if (map) {
      return
    }

    if (mapContainer && mapContainer.current) {
      const mapboxMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: {
          lat: latitude,
          lon: longitude
        },
        zoom
      })

      mapboxMap.addControl(
        new mapboxgl.NavigationControl({
          showCompass: true,
          showZoom: true,
          visualizePitch: false
        }), 'top-left'
      )

      for (const place of places) {
        new mapboxgl.Marker({ draggable: true })
          .setLngLat([place.longitude, place.latitude])
          .setPopup(new mapboxgl.Popup().setHTML(`<p>${place.description}</p>`))
          .addTo(mapboxMap)
          .on('dragend', function (event: any) {
            console.log(event.target._lngLat)
          })
      }

      setMap(mapboxMap)
    }
  }

  useEffect(renderInitialMap)

  useEffect(() => {
    if (map) {
      map.flyTo({
        center: {
          lat: latitude,
          lon: longitude
        },
        zoom
      })
    }
  }, [map, latitude, longitude, zoom])

  return (
    <div ref={mapContainer} style={{ width: '100%', height: '100%' }} />
  )
}
