import { Button, Checkbox, FormControlLabel, FormGroup } from '@mui/material'
import classNames from 'classnames'
import React, { useState } from 'react'

export const AudioFilter = ({
  interactions,
  onFilter,
}: {
  interactions: string[]
  onFilter: (values: { typeIncludes: string[]; selectedInteractions: string[] }) => void
}) => {
  const [includeSfx, setIncludeSfx] = useState(true)
  const [includeVo, setIncludeVo] = useState(true)
  const [selectedInteractions, setSelectedInteractions] = useState<string[]>([])

  const onCheckbox = (fn: React.Dispatch<React.SetStateAction<boolean>>) => (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => fn(e.target.checked)

  const onClick = (value: string) => (e: React.MouseEvent<HTMLDivElement>) => {
    setSelectedInteractions((prev) => {
      if (prev.includes(value)) return prev.filter((i) => i !== value)

      return prev.concat([value])
    })
  }

  const onSubmit = () => {
    const sfx = includeSfx ? ['sfx'] : []
    const vo = includeVo ? ['vo'] : []

    onFilter({ typeIncludes: sfx.concat(vo), selectedInteractions })
  }

  return (
    <div>
      <p className='font-nunito font-semibold mb-4 text-gum-500'>Champion Interactions</p>
      <div className='flex justify-center flex-wrap mb-4'>
        {interactions.map((i) => (
          <div
            key={i}
            title={i}
            className={classNames(
              'cursor-pointer h-7 w-7 rounded-full bg-cover bg-center bg-no-repeat mr-2 mb-2 border border-white',
              selectedInteractions.includes(i) && 'border-gum-500',
            )}
            style={{
              backgroundImage: `url(http://ddragon.leagueoflegends.com/cdn/img/champion/splash/${i
                .charAt(0)
                .toUpperCase()}${i.substring(1)}_0.jpg)`,
            }}
            onClick={onClick(i)}
          />
        ))}
      </div>
      <p className='font-nunito font-semibold mb-4 text-gum-500'>Audios</p>
      <FormGroup className='mb-4'>
        <FormControlLabel
          control={<Checkbox checked={includeSfx} onChange={onCheckbox(setIncludeSfx)} />}
          label='Sound effects'
        />
        <FormControlLabel
          control={<Checkbox checked={includeVo} onChange={onCheckbox(setIncludeVo)} />}
          label='Voice-overs'
        />
      </FormGroup>
      <Button className='text-gum-500' variant='contained' onClick={onSubmit}>
        Apply
      </Button>
    </div>
  )
}
