import React, { useState, ChangeEvent } from 'react'
import styled from 'styled-components'

type PlaceQueriesProps = {
  filtersItems: {
    types: string[]
  }
  initialSort?: string
  onFilter?: (filter: App.PlaceListFilter) => void
  onSort?: (fieldName: string) => void
}

type PlaceListSort = {
  name: string
  text: string
}

const StyledContainer = styled.div`
  flex: 0;
  width: 100%;

  > div label {
    cursor: pointer;
    margin-left: 10px;
  }

  > div label input {
    margin-right: 5px;
  }

  > p label {
    margin-right: 10px;
  }
`

const fieldsToSort = [{
  name: 'name',
  text: 'Name'
}, {
  name: 'start_date',
  text: 'Date'
}]

export default function PlaceListQueries (props: PlaceQueriesProps) {
  const { filtersItems, initialSort = '', onFilter, onSort } = props
  const { types } = filtersItems
  const [selectedTypes, setSelectedTypes] = useState<string[]>([...types])
  const [selectedSort, setSelectedSort] = useState(initialSort)

  function handleChangeType (event: ChangeEvent<HTMLInputElement>) {
    const { checked, value } = event.target
    let types = [...selectedTypes]

    if (checked) {
      types.push(value)
    } else {
      types = types.filter((current: string) => current !== value)
    }

    setSelectedTypes(types)

    if (onFilter) {
      onFilter({ name: 'types', value: types })
    }
  }

  function handleChangeSort (event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target

    setSelectedSort(value)

    if (onSort) {
      onSort(value)
    }
  }

  return (
    <StyledContainer>
      <div className="place_list_filters">
        <p>Filter by:</p>
        <p>
          {
            types.map((current: string) => {
              return (
                <label key={current}>
                  <input
                    type="checkbox"
                    value={current}
                    checked={selectedTypes.some((type: string) => type === current)}
                    onChange={handleChangeType}
                  />
                  {current}
                </label>
              )
            })
          }
        </p>
      </div>
      <p>
        <label htmlFor="placeListSort">Sort by:</label>
        <select
          id="placeListSort"
          onChange={handleChangeSort}
          defaultValue={selectedSort}
        >
          <option value="">-- select one --</option>
          {
            fieldsToSort.map((current: PlaceListSort) => {
              const { name, text } = current

              return (
                <option key={name} value={name}>{text}</option>
              )
            })
          }
        </select>
      </p>
    </StyledContainer>
  )
}
