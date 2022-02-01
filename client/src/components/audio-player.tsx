import { useCharacterQuery } from '../../../graphql/generated/types'
import { useAppContext } from '../context'

export const AudioPlayer = () => {
  const [{ selectedChampion }] = useAppContext()

  // TODO: there is a bug here that causes the query to return null assets
  // after the characters list expands in GridSelect
  const { data, error, loading } = useCharacterQuery({
    variables: {
      filter: {
        nameEq: selectedChampion?.basicInfo?.id?.toLowerCase(),
        typeEq: 'champion',
        assetsTypeEq: 'sfx',
      },
      includeAssets: true,
    },
    fetchPolicy: 'network-only', // Used for first execution
    nextFetchPolicy: 'cache-first', // Used for subsequent executions
  })

  const onClick = (filePath?: string | null) => () => {
    fetch(`/api/getAudio/${filePath}`).then((res) => {
      const audio = new Audio(res.url)
      audio.play()
    })
  }

  return (
    <div>
      <p>Sound list</p>
      <div className='overflow-y-auto h-64'>
        {data?.character?.assets?.map((a) => (
          <p key={a?.id} onClick={onClick(a?.path)}>
            {a?.name}
          </p>
        ))}
      </div>
    </div>
  )
}
