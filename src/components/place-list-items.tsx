import React from 'react'
import PlaceListItem from './place-list-item'

interface PlaceListItemsProps {
  items: App.Place[]
  selected?: App.PlaceSelected
  onSelect?: (item: App.Place) => void
}

export default function PlaceListItems (props: PlaceListItemsProps) {
  const { items, selected = null, onSelect } = props

  return (
    <div role="list">
      {
        items.map((item, index) => {
          return (
            <PlaceListItem
              key={index}
              item={item}
              active={item === selected}
              onSelect={() => onSelect && onSelect(item)}
            />
          )
        })
      }
    </div>
  )
}
