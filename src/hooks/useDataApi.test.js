// Referencia
// https://medium.com/@doppelmutzi/testing-of-a-custom-react-hook-for-fetching-data-with-axios-26f012948a8f

import { renderHook } from '@testing-library/react-hooks'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'

import UseDataApi from '../hooks/UseDataApi'

test('UseDataApi performs GET request', async () => {
  //const initialValue = []
  const mock = new MockAdapter(axios)

  const mockData = 'response'
  const url = 'http://mock'
  mock.onGet(url).reply(200, mockData)

  const { result, waitForNextUpdate } = renderHook(() =>
    UseDataApi(url)
  )

  expect(result.current.data).toEqual([])
  expect(result.current.isFetching).toBeTruthy()

  await waitForNextUpdate()

  expect(result.current.data).toEqual('response')
  expect(result.current.isFetching).toBeFalsy()
})

test('UseDataApi performs multiple GET requests for different URLs', async () => {
  // fetch 1
  const mock = new MockAdapter(axios)

  const mockData = 'response 1'
  const url = 'http://mock'
  mock.onGet(url).reply(200, mockData)

  const { result, waitForNextUpdate } = renderHook(() =>
    UseDataApi(url)
  )

  expect(result.current.data).toEqual([])
  expect(result.current.isFetching).toBeTruthy()

  await waitForNextUpdate()

  expect(result.current.data).toEqual('response 1')
  expect(result.current.isFetching).toBeFalsy()

  // fetch 2
  const url2 = 'http://mock2'
  const mockData2 = 'response 2'
  mock.onGet(url2).reply(200, mockData2)

  const { result: result2, waitForNextUpdate: waitForNextUpdate2 } = renderHook(
    () => UseDataApi(url2)
  )

  expect(result2.current.data).toEqual([])
  expect(result2.current.isFetching).toBeTruthy()

  await waitForNextUpdate2()

  expect(result2.current.data).toEqual('response 2')
  expect(result2.current.isFetching).toBeFalsy()
})

test('UseDataApi sets loading to false and returns inital value on network error', async () => {
  const mock = new MockAdapter(axios)

  const initialValue = []
  const url = 'http://mock'

  mock.onGet(url).networkError()

  const { result, waitForNextUpdate } = renderHook(() =>
    UseDataApi(url)
  )

  expect(result.current.data).toEqual(initialValue)
  expect(result.current.isFetching).toBeTruthy()

  await waitForNextUpdate()

  expect(result.current.isFetching).toBeFalsy()
  expect(result.current.data).toEqual(initialValue)
})