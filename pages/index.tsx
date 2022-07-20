import { Home } from '@components/featuresets/home'
import { useCharactersQuery } from '@graphql/generated/types'
import { apolloClient } from '@lib/apollo'
import charactersQuery from '../graphql/queries/characters-query.graphql'

export async function getStaticProps() {
  // const { data, loading, error } = useCharactersQuery({
  //   variables: {
  //     page: 1,
  //     pageSize: 7,
  //     includeAssets: true,
  //     filter: {
  //       typeEq: 'champion',
  //     },
  //   },
  // })

  const { data, loading, error } = await apolloClient.query({
    query: charactersQuery,
    variables: {
      page: 1,
      pageSize: 10,
      includeAssets: true,
      filter: {
        typeEq: 'champion',
      },
    },
  })

  // will be passed to the page component as props
  return {
    props: {
      data: data,
      loading,
      error: error ?? null,
    },
  }
}

export default (props: ReturnType<typeof useCharactersQuery>) => {
  return <Home {...props} />
}
