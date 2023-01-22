import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlaceListItem from './place-list-item'

describe('components/place-list-item.tsx', function () {
  const item = {
    name: 'São José dos Campos, Brazil',
    latitude: -23.189333,
    longitude: -45.9330524,
    type: 'hometown',
    start_date: '1990-05-15',
    end_date: '2016-02-19',
    description: 'The city I was born'
  }

  test('should render as inactive', () => {
    const { container } = render(
      <PlaceListItem item={item} />
    )

    expect(container.firstChild).not.toHaveClass('active')
  })

  test('should render as active', () => {
    const { container } = render(
      <PlaceListItem item={item} active={true} />
    )

    expect(container.firstChild).toHaveClass('active', { exact: false })
  })

  test('should fire onSelect event', () => {
    const onSelect = jest.fn()
    const { container, getByRole } = render(
      <PlaceListItem item={item} onSelect={onSelect} />
    )

    userEvent.click(getByRole('listitem'))

    expect(onSelect).toHaveBeenCalled()
  })
})
