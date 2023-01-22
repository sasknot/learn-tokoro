import { Page } from 'puppeteer'
import { getBrowser, appUrl } from './setupTests'

describe('App.tsx', function () {
  let page: Page

  beforeAll(async () => {
    page = await getBrowser().newPage()

    page.emulate({
      viewport: {
        width: 500,
        height: 2400,
      },
      userAgent: ''
    })

    return page.goto(appUrl)
  })

  test('should have .app', async () => {
    const $element = await page.$('.app')

    expect($element).toBeTruthy()
  }, 16000)

  test('should have .sidebar', async () => {
    const $element = await page.$('.sidebar')

    expect($element).toBeTruthy()
  }, 16000)

  test('should have .map_container', async () => {
    const $element = await page.$('.map_container')

    expect($element).toBeTruthy()
  }, 16000)
})
