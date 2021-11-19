import Input from '@components/Input'
import { Layout } from '@components/Layout'
import { LinearProgress } from '@mui/material'
import {
  selectChampions,
  selectPlayerChampion,
  setPlayerChampion,
} from '@store/slices/championSlice'
import classNames from 'classnames'
import { useDispatch, useSelector } from 'react-redux'

export const Interactive = () => {
  const champions = useSelector(selectChampions)
  const playerChampion = useSelector(selectPlayerChampion)
  const dispatch = useDispatch()

  const onInput = () => {}

  const items = Object.values(champions).map((val) => ({ ...val }))

  const onClick = (value: any) => () => {
    const champion = champions[value.id]
    console.log(value)
    dispatch(setPlayerChampion(champion))
  }

  return (
    <Layout>
      <div className='bg-gray-900 p-4 h-full'>
        <div className='w-1/4'>
          <Input
            onChange={onInput}
            value={null}
            classes='mb-4 bg-gray-600'
            options={items.map((i) => i.name)}
            label='Select a champion'
          />
        </div>

        <div className='flex flex-wrap'>
          {items.map((c) => (
            <div
              key={c.id}
              onClick={onClick(c)}
              className={classNames(
                'rounded shadow w-80 mr-4 mb-4 hover:animate-bounce',
                c.id !== playerChampion.id && 'border border-white',
                c.id === playerChampion.id && 'border-blue-500 border-4',
              )}
            >
              <div
                className='h-20 relative rounded-t bg-center bg-cover'
                style={{
                  backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${c.name}_0.jpg)`,
                }}
              >
                <img
                  className='absolute inset-x-1/2 -bottom-5 rounded-full h-10 w-10'
                  src={`http://ddragon.leagueoflegends.com/cdn/11.21.1/img/champion/${c.image?.full}`}
                />
              </div>
              <div className='text-white p-4'>
                <p className='mb-4 text-xl'>{c.name}</p>
                {Object.entries(c?.info || {})
                  .filter(([key, value]) => key !== 'difficulty')
                  .map(([key, value]) => (
                    <div key={key}>
                      <p className='capitalize'>{key}</p>
                      <LinearProgress
                        className='w-full rounded mb-2'
                        variant='determinate'
                        value={value * 10}
                        sx={{ height: '8px' }}
                      />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  )
}
