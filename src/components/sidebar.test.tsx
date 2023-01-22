import { FC } from 'react'
import { render, fireEvent } from '@testing-library/react'
import Sidebar from './sidebar'
import { MapProvider } from '../contexts/map-context'

describe('components/sidebar.tsx', function () {
  const places = [{
    "name": "Toyota, Japan",
    "latitude": 35.1410838,
    "longitude": 137.1707944,
    "type": "hometown",
    "start_date": "2018-06-26",
    "end_date": "2020-02-14",
    "description": "Trying a new life in Japan"
  }, {
    "name": "Okazaki, Japan",
    "latitude": 34.9511364,
    "longitude": 137.1918578,
    "type": "visit",
    "start_date": "2019-05-02",
    "end_date": "2019-05-02",
    "description": "Visiting some relatives of my wife"
  }] as App.Place[]
  const mapProviderWrapper: FC = (props) => (
    <MapProvider latitude={22} longitude={22} zoom={11} places={places}>
      {props.children}
    </MapProvider>
  )

  test('should render empty place list items', async () => {
    const { container } = render(
      <Sidebar />,
      {
        wrapper: (props: any) => (
          <MapProvider latitude={22} longitude={22} zoom={11} places={[]}>
            {props.children}
          </MapProvider>
        )
      }
    )

    expect(container.querySelectorAll('.place_list_item').length).toBe(0)
  })

  test('should render place list items with 2 items', async () => {
    const { container } = render(
      <Sidebar />,
      { wrapper: mapProviderWrapper }
    )

    expect(container.querySelectorAll('.place_list_item').length).toBe(2)
  })

  test('should render place list items with 2 items', async () => {
    const { container } = render(
      <Sidebar />,
      { wrapper: mapProviderWrapper }
    )

    expect(container.querySelectorAll('.place_list_item').length).toBe(2)
  })

  test('should fire navigation previous event', () => {
    const { container } = render(
      <Sidebar />,
      { wrapper: mapProviderWrapper }
    )
    const $button = container.querySelector('.sidebar_navigation button:first-child')

    if ($button) {
      fireEvent.click($button)
    }
  })

  test('should fire navigation next event', () => {
    const { container } = render(
      <Sidebar />,
      { wrapper: mapProviderWrapper }
    )
    const $button = container.querySelector('.sidebar_navigation button:last-child')

    if ($button) {
      fireEvent.click($button)
    }
  })
})
