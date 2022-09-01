import { Home } from '@components/featuresets/home'
import { trpc } from '@utils/trpc'

export default () => {
  const hello = trpc.useQuery(['hello', { text: 'client' }])
  const chars = trpc.useQuery([
    'character.all',
    {
      page: 1,
      pageSize: 10,
      includeAssets: true,
      filter: {
        typeEq: 'champion',
      },
    },
  ])

  console.log({ data: hello.data, chars: chars.data })

  return <Home />
}
