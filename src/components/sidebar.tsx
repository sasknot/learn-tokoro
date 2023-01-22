import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { MapContext } from '../contexts/map-context'
import PlaceListQueries from './place-list-queries'
import PlaceList from './place-list'

const StyledContainer = styled.section`
  background-color: #fff;

  flex: 0 0 400px;
  padding: 10px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: flex-start;

  nav {
    flex: 0;
    width: 100%;
    text-align: center;

    button {
      background-color: #f0f0f0;
      margin: 0 10px;
      padding: 5px 10px;
      cursor: pointer;
    }
  }
`

export default function Sidebar () {
  const { flyTo, places } = useContext(MapContext)
  const [currentPlaces, setCurrentPlaces] = useState<App.Place[]>(places)
  const [selectedPlaceItem, setSelectedPlaceItem] = useState<App.PlaceSelected>(null)
  const allTypesOfPlace = places
    .filter((place, index, all) => {
      return index === all.findIndex((current) => current.type === place.type)
    })
    .map((current) => current.type)

  function handlePlaceFilter (filter: App.PlaceListFilter) {
    const { name, value } = filter

    if (name === 'types') {
      const newPlaces = places.filter((current) => {
        return value.includes(current.type)
      })
      const haSelectedItemInNewPlaces = newPlaces.some((current) => {
        return current === selectedPlaceItem
      })

      if (!haSelectedItemInNewPlaces) {
        setSelectedPlaceItem(null)
      }

      setCurrentPlaces(newPlaces)
    }
  }

  function handlePlaceSort (fieldName: string) {
    const places = [...currentPlaces]

    places.sort((first, second) => {
      let output = 0

      if (fieldName === 'name') {
        output = first.name.localeCompare(second.name)
      } else if (fieldName === 'start_date') {
        const firstStartDate = new Date(first.start_date)
        const secondStartDate = new Date(second.start_date)

        if (firstStartDate > secondStartDate) {
          output = 1
        } else if (firstStartDate < secondStartDate) {
          output = -1
        }
      }

      return output
    })

    setCurrentPlaces(places)
  }

  function handlePlaceSelect (item: App.Place) {
    setSelectedPlaceItem(item)
    flyTo(item.latitude, item.longitude)
  }

  function handlePlacePrev () {
    const selectedPlaceIndex = currentPlaces.findIndex((current) => {
      return current === selectedPlaceItem
    })
    const newSelectedPlaceIndex = selectedPlaceIndex <= 0
      ? currentPlaces.length - 1
      : selectedPlaceIndex - 1

    handlePlaceSelect(currentPlaces[newSelectedPlaceIndex])
  }

  function handlePlaceNext () {
    const selectedPlaceIndex = currentPlaces.findIndex((current) => {
      return current === selectedPlaceItem
    })
    const newSelectedPlaceIndex = selectedPlaceIndex === currentPlaces.length - 1
      ? 0
      : selectedPlaceIndex + 1

    handlePlaceSelect(currentPlaces[newSelectedPlaceIndex])
  }

  return (
    <StyledContainer>
      <PlaceListQueries
        filtersItems={{ types: allTypesOfPlace }}
        onFilter={handlePlaceFilter}
        onSort={handlePlaceSort}
      />

      <PlaceList
        items={currentPlaces}
        selectedItem={selectedPlaceItem}
        onItemSelect={handlePlaceSelect}
      />

      <nav>
        <button onClick={handlePlacePrev}>&lt; Previous</button>
        <button onClick={handlePlaceNext}>Next &gt;</button>
      </nav>
    </StyledContainer>
  )
}
