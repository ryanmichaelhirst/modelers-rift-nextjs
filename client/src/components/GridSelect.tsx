import { Card } from '@components/Card'
import Input from '@components/Input'
import { Loader } from '@components/Loader'
import SkinSelect from '@components/SkinSelect'
import { chooseChampion, selectPlayerChampion } from '@store/slices/championSlice'
import classNames from 'classnames'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GridSelect = ({ items }: { items: any[] }) => {
  const champion = useSelector(selectPlayerChampion)
  const [selected, setSelected] = useState<Record<string, any>>()
  const dispatch = useDispatch()

  useEffect(() => {
    if (!selected && items) {
      const item = items[0]

      setSelected(item)
    }
  }, [items])

  const onInput = (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
    if (reason !== 'selectOption') return

    const item = items.find((i) => i.name === value)
    if (!item) return

    dispatch(chooseChampion('playerChampion', item))
    setSelected(item)
  }

  const onClick = (item: Record<string, any>) => () => {
    dispatch(chooseChampion('playerChampion', item))
    setSelected(item)
  }

  const skins =
    champion?.skins?.map((s: any) => ({
      ...s,
      src: `http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champion.name}_${s.num}.jpg`,
    })) || []

  return (
    <div style={{ transform: 'perspective(500px) rotateY(15deg)' }}>
      <Card>
        {selected ? (
          <Input
            onChange={onInput}
            value={selected.name}
            classes='mb-4'
            options={items.map((i) => i.name)}
            label='Select your champion'
          />
        ) : (
          <Loader />
        )}
        <div className='grid grid-flow-row grid-cols-4 gap-0.5 overflow-y-auto h-64'>
          {items ? (
            items.map((i, idx) => {
              const active = i.name === selected?.name

              return (
                <div
                  key={idx}
                  className={classNames(
                    'bg-cover bg-center h-20 text-white',
                    !active && 'opacity-70',
                  )}
                  style={{
                    backgroundImage: `url(${i.square_asset})`,
                  }}
                  onClick={onClick(i)}
                >
                  <p>{i.name}</p>
                </div>
              )
            })
          ) : (
            <Loader />
          )}
        </div>
      </Card>

      <Card style={{ marginTop: '15px' }}>{skins ? <SkinSelect items={skins} /> : <Loader />}</Card>
    </div>
  )
}

export default GridSelect
