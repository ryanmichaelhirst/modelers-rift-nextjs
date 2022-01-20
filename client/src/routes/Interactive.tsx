import Input from '@components/Input'
import { Layout } from '@components/Layout'
import { LinearProgress } from '@mui/material'
import classNames from 'classnames'
import { useCharactersIndexQuery } from '../../../graphql/generated/types'
import { useAppContext } from '../context'
import { capitalizeWord } from '../utils'

export const Interactive = () => {
  const [{ selectedChampion, lolChampionsData, selectedPatch }, dispatch] = useAppContext()
  const { data, error, loading } = useCharactersIndexQuery({
    variables: {
      filter: {
        nameCnt: '',
        includeAssets: true,
      },
    },
  })

  const onInput = () => {}

  const characters = data?.characters || []

  const onClick = (value: any) => () => {
    // const champion = getChampion(selectedPatch, value.name)
    // dispatch({ type: SET_SELECTED_CHAMPION_BASIC_INFO, payload: value })
  }

  return (
    <Layout>
      <div className='bg-space-900 p-4 h-full'>
        <div className='w-1/4'>
          <Input
            onChange={onInput}
            value={null}
            classes='mb-4 bg-space-700'
            options={characters.map((c) => c?.name)}
            label='Select a champion'
          />
        </div>

        <div className='flex flex-wrap'>
          {characters.map((c) => {
            const capitalizedName = capitalizeWord(c?.name)
            const lolData = lolChampionsData[capitalizedName]

            return (
              <div
                key={c?.name}
                onClick={onClick(c)}
                className={classNames(
                  'bg-space-600 rounded shadow w-80 mr-4 mb-4 border-2 border-transparent hover:border-blue-400',
                  c?.name === selectedChampion.basicInfo?.name && 'border-blue-500',
                )}
              >
                <div
                  className='h-20 relative rounded-t bg-center bg-cover'
                  style={{
                    backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${capitalizedName}_0.jpg)`,
                  }}
                >
                  <img
                    className='absolute inset-x-1/2 -bottom-5 rounded-full h-10 w-10'
                    src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${lolData?.image?.full}`}
                  />
                </div>
                <div className='text-white p-4'>
                  <p className='mb-4 text-xl'>{capitalizedName}</p>
                  {Object.entries(lolData?.info || {})
                    .filter(([key, value]) => key !== 'difficulty')
                    .map(([key, value]) => (
                      <div key={key}>
                        <p className='capitalize'>{key}</p>
                        <LinearProgress
                          className='w-full rounded mb-2'
                          variant='determinate'
                          // @ts-ignore
                          value={value * 10}
                          sx={{ height: '8px' }}
                        />
                      </div>
                    ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}
