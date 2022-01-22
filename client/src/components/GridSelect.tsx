import { Card } from '@components/Card'
import Input from '@components/Input'
import { Loader } from '@components/Loader'
import SkinSelect from '@components/SkinSelect'
import { FETCH_NEW_CHAMPION } from '@customtypes/index'
import classNames from 'classnames'
import React, { useState } from 'react'
import { useCharactersQuery } from '../../../graphql/generated/types'
import { useAppContext } from '../context'

const GridSelect = () => {
  const [pageSize, setPageSize] = useState(20)
  const { data, loading } = useCharactersQuery({
    variables: {
      filter: {
        typeEq: 'champion',
      },
      pageSize,
    },
  })

  const [{ selectedChampion, selectedPatch, lolChampionsData }, dispatch] = useAppContext()
  const characters = data?.characters?.collection || []

  const onScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const bottom =
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop === e.currentTarget.clientHeight

    if (bottom) {
      setPageSize((prev) => {
        if (pageSize >= 160) return prev

        return prev + 20
      })
    }
  }

  const onInput = (e: React.SyntheticEvent<Element, Event>, value: any, reason: string) => {
    if (reason !== 'selectOption') return

    const champ = characters.find((c) => c?.name?.toLowerCase() === value.toLowerCase())
    if (!champ) return

    dispatch({ type: FETCH_NEW_CHAMPION, payload: { name: champ?.name } })
  }

  const onClick = (name?: string | null) => async () => {
    if (!name) return

    dispatch({ type: FETCH_NEW_CHAMPION, payload: name })
  }

  return (
    <div style={{ transform: 'perspective(500px) rotateY(15deg)' }}>
      <Card>
        {selectedChampion ? (
          <Input
            onChange={onInput}
            value={selectedChampion.basicInfo?.name}
            classes='mb-4'
            options={characters.map((c) => c?.displayName || '')}
            label='Select your champion'
          />
        ) : (
          <Loader />
        )}
        <div
          onScroll={onScroll}
          className='grid grid-flow-row grid-cols-4 gap-0.5 overflow-y-auto h-64'
        >
          {loading ? (
            <Loader />
          ) : (
            characters.map((c) => {
              const active = c?.name === selectedChampion?.basicInfo?.name?.toLowerCase()
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
                  onClick={onClick(c?.displayName)}
                >
                  <p>{c?.displayName}</p>
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
