import React from 'react'
import styled from 'styled-components'

import Sidebar from './components/sidebar'
import Map from './components/map'
import placesJSON from './places.json'
import { MapProvider } from './contexts/map-context'

const StyledContainer = styled.main`
  height: 100vh;
  width: 100vw;

  display: flex;
  flex-flow: row nowrap;
  overflow: hidden;

  font: 400 1rem Inter, sans-serif;
`

// // @TODO: get from navigator (with perm)
const defaultLatitude = Number(process.env.REACT_APP_MAP_DEFAULT_LATITUDE || -23.545414853623754)
const defaultLongitude = Number(process.env.REACT_APP_MAP_DEFAULT_LONGITUDE || -46.63545233720842)
const defaultZoom = Number(process.env.REACT_APP_MAP_DEFAULT_ZOOM || 11)

export default function App () {
  return (
    <MapProvider
      latitude={defaultLatitude}
      longitude={defaultLongitude}
      zoom={defaultZoom}
      places={placesJSON}
    >
      <StyledContainer>
        <Sidebar />
        <Map />
      </StyledContainer>
    </MapProvider>
  )
}
