import React from 'react'
import styled, { css } from 'styled-components'

interface PlaceListItemProps {
  item: App.Place
  active?: boolean
  onSelect?: (item: App.Place) => void
}

const StyledContainer = styled.div<{ active: boolean }>`
  border-radius: 10px;
  padding: 10px;
  margin: 5px 0;
  cursor: pointer;

  transition: background-color 200ms;

  &::after {
    content: '';
    display: block;
    height: 1px;
    background-color: #c0c0c0;
    margin-top: 10px;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  &:first-child {
    border-top: none;
  }

  p {
    margin: 2px 0;
  }

  ${({ active }) => active && css`
    background-color: #dfdfdf;
  `}
`

export default function PlaceListItem (props: PlaceListItemProps) {
  const { item, active = false, onSelect } = props
  const { name, start_date: startDate, description } = item

  return (
    <StyledContainer
      role="listitem"
      active={active}
      onClick={() => onSelect && onSelect(item)}
    >
      <p>{name}</p>
      <p>From: {startDate}</p>
      <p>{description}</p>
    </StyledContainer>
  )
}
