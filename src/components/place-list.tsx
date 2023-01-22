import React from 'react'
import styled from 'styled-components'

import PlaceListItems from './place-list-items'

type PlaceListProps = {
  items: App.Place[]
  selectedItem: App.PlaceSelected
  onItemSelect?: (item: App.Place) => void
}

const StyledContainer = styled.div`
  flex: 1;
  width: 100%;
  overflow-y: scroll;
`

export default function PlaceList (props: PlaceListProps) {
  const { items, selectedItem = null, onItemSelect } = props

  return (
    <StyledContainer>
      <h3>Places list</h3>

      <PlaceListItems
        items={items}
        selected={selectedItem}
        onSelect={onItemSelect}
      />
    </StyledContainer>
  )
}
