import { useEffect, useState } from 'react'
import axios from 'axios'

const initialState = {
  data: [],
  isFetching: false,
  error: ''
}

const useDataApi = (url: string) => {
  const [dataState, setDataState] = useState(initialState)
  const [endpointUrl] = useState(url)

  useEffect(() => {
    const fetchDataFromApi = async () => {
      try {
        setDataState({ ...dataState, isFetching: true })

        const response = await axios.get(endpointUrl, { headers: authHeader() })

        setDataState({
          ...dataState,
          data: response.data,
          isFetching: false,
          error: ''
        })
      } catch (e) {
        console.log(e)
        setDataState({ ...dataState, isFetching: false, error: e })
      }
    }

    fetchDataFromApi()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { ...dataState }
}

// fake auth token
const refreshAccessToken = () => Math.random().toString(36)

export function authHeader() {
  //const user = JSON.parse(localStorage.getItem('user'))
  const user = {
    accessToken: ''
  }

  if (user && user?.accessToken) {
    return { Authorization: 'Bearer ' + user?.accessToken }
  } else {
    return {}
  }
}

export default useDataApi
