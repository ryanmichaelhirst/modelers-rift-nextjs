import { Card } from '@components/Card'
import Input from '@components/Input'
import { Loader } from '@components/Loader'
import SkinSelect from '@components/SkinSelect'
import classNames from 'classnames'
import { useCharactersIndexQuery } from '../../../graphql/generated/types'
import {
  SET_SELECTED_CHAMPION_BASIC_INFO,
  SET_SELECTED_CHAMPION_DETAILED_INFO,
  useAppContext,
} from '../context'
import { getChampion } from '../utils'

const GridSelect = () => {
  const { data, loading } = useCharactersIndexQuery({
    variables: {
      filter: {
        typeEq: 'champion',
      },
    },
  })
  const [{ selectedChampion, selectedPatch, lolChampionsData }, dispatch] = useAppContext()
  const characters = data?.characters || []

  const onInput = (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
    if (reason !== 'selectOption') return

    const champ = characters.find((c) => c?.name === value)
    if (!champ) return

    dispatch({ type: SET_SELECTED_CHAMPION_BASIC_INFO, payload: champ })
  }

  const onClick = (name?: string | null) => async () => {
    if (!name) return

    const detailedInfo = await getChampion(selectedPatch, name)
    const basicInfo = lolChampionsData[name]

    dispatch({ type: SET_SELECTED_CHAMPION_BASIC_INFO, payload: basicInfo })
    dispatch({ type: SET_SELECTED_CHAMPION_DETAILED_INFO, payload: detailedInfo })
  }

  return (
    <div style={{ transform: 'perspective(500px) rotateY(15deg)' }}>
      <Card>
        {selectedChampion ? (
          <Input
            onChange={onInput}
            value={selectedChampion.basicInfo?.name?.toLowerCase()}
            classes='mb-4'
            options={characters.map((c) => c?.name || '')}
            label='Select your champion'
          />
        ) : (
          <Loader />
        )}
        <div className='grid grid-flow-row grid-cols-4 gap-0.5 overflow-y-auto h-64'>
          {loading ? (
            <Loader />
          ) : (
            characters.map((c) => {
              const active = c?.name === selectedChampion?.basicInfo?.name
              const square_asset = lolChampionsData[c?.name || '']?.square_asset
              const backgroundImage = `url(${square_asset})`

              return (
                <div
                  key={c?.id}
                  className={classNames(
                    'bg-cover bg-center h-20 text-white',
                    !active && 'opacity-70',
                  )}
                  style={{
                    backgroundImage,
                  }}
                  onClick={onClick(c?.name)}
                >
                  <p>{c?.name}</p>
                </div>
              )
            })
          )}
        </div>
      </Card>

      <Card style={{ marginTop: '15px' }}>
        <SkinSelect />
      </Card>
    </div>
  )
}

export default GridSelect
