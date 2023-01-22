// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom'
import 'mapbox-gl/dist/mapbox-gl.css'
import puppeteer, { Browser } from 'puppeteer'

let browser: Browser

beforeAll(async () => {
  browser = await puppeteer.launch({})
})

afterAll(async () => {
  browser.close()
})

export function getBrowser (): Browser {
  return browser
}

export const appUrl = 'http://localhost:3000'

// @TODO: run react app at another port
