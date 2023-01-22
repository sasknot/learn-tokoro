import React, { useContext } from 'react'
import styled from 'styled-components'

import { MapContext } from '../contexts/map-context'
import Mapbox from './mapbox'

const StyledContainer = styled.section`
  flex-grow: 1;
`

// @TODO: implement markers and popups for each place
export default function Map () {
  const { latitude, longitude, zoom, places } = useContext(MapContext)
  const markers: App.MapboxMarker[] = places.map((current) => {
    return {
      latitude: current.latitude,
      longitude: current.longitude,
      description: current.description
    }
  })

  return (
    <StyledContainer>
      <Mapbox
        latitude={latitude}
        longitude={longitude}
        zoom={zoom}
        places={markers}
      />
    </StyledContainer>
  )
}
