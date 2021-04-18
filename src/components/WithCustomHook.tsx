import React from 'react'

import useDataApi from '../hooks/UseDataApi'

const POSTS_SERVICE_URL = 'https://jsonplaceholder.typicode.com/posts'

const WithHooks = () => {
  const {data, isFetching, error} = useDataApi(POSTS_SERVICE_URL)

  //const {data, isFetching, error} = dataState

  return (
    <>
    {error ? (
      <> Alguma coisa aconteceu de errado!!! </>
      ) : (
        <PostsList
          data={data.slice(0, 5)}
          isFetching={isFetching}
          error={error}
        />
      )
    }
    </>
  )
}

const PostsList = (props: any) => {
  console.log(props)
  return <h1>teste</h1>
}

export default WithHooks 
