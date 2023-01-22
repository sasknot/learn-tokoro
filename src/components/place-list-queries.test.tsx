import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlaceListQueries from './place-list-queries'

describe('components/place-list-queries.tsx', function () {
  const types = ['hometown', 'travel', 'visit']

  test('should render', () => {
    const { container } = render(
      <PlaceListQueries
        filtersItems={{ types }}
      />
    )

    expect(container.firstChild).toMatchSnapshot()
  })

  test('should fire onFilter event', () => {
    const onFilter = jest.fn()
    const { container, getByDisplayValue } = render(
      <PlaceListQueries
        filtersItems={{ types }}
        onFilter={onFilter}
      />
    )
    const $checkbox = getByDisplayValue('hometown')

    userEvent.click($checkbox)

    expect($checkbox).not.toBeChecked()
    expect(onFilter).toHaveBeenCalled()
  })

  test('should fire onSort event', () => {
    const onSort = jest.fn()
    const { container, getByLabelText } = render(
      <PlaceListQueries
        filtersItems={{ types }}
        onSort={onSort}
      />
    )
    const $select = getByLabelText('Sort by:')

    userEvent.selectOptions($select, ['name'])

    expect($select).toHaveValue('name')
    expect(onSort).toHaveBeenCalled()
  })
})
