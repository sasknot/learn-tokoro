import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PlaceListItems from './place-list-items'

describe('components/place-list-items.tsx', function () {
  const items = [{
    "name": "São José dos Campos, Brazil",
    "latitude": -23.189333,
    "longitude": -45.9330524,
    "type": "hometown",
    "start_date": "1990-05-15",
    "end_date": "2016-02-19",
    "description": "The city I was born"
  }, {
    "name": "São Paulo, Brazil",
    "latitude": -23.5562729,
    "longitude": -46.6831742,
    "type": "hometown",
    "start_date": "2016-02-19",
    "end_date": "2018-06-24",
    "description": "Where I grew up more professionally"
  }]

  test('should render empty list', async () => {
    const { container } = render(
      <PlaceListItems items={[]} />
    )

    expect(container.querySelectorAll('.place_list_item').length).toBe(0)
  })

  test('should render with 2 items', async () => {
    const { container } = render(
      <PlaceListItems items={items} />
    )

    expect(container.querySelectorAll('.place_list_item').length).toBe(2)
  })

  test('should render with selected item index as 1', async () => {
    const { container } = render(
      <PlaceListItems items={items} selected={items[1]} />
    )

    expect(container.querySelectorAll('.place_list_item').length).toBe(2)
    expect(container.querySelectorAll('.place_list_item.active').length).toBe(1)
  })

  test('should fire onSelect event', () => {
    const onSelect = jest.fn()
    const { container, getAllByRole } = render(
      <PlaceListItems items={items} onSelect={onSelect} />
    )

    userEvent.click(getAllByRole('listitem')[0])

    expect(onSelect).toHaveBeenCalled()
  })
})
