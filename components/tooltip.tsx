import { STAT_SEMANTIC_TEMPLATES } from '@customtypes/constants'
import { Spell } from '@customtypes/index'
import { Tooltip as MuiTooltip } from '@mui/material'
import { FC, ReactNode } from 'react'

export const Tooltip: FC<{ title: ReactNode }> = ({ children, title }) => (
  // @ts-ignore
  <MuiTooltip title={title}>{children}</MuiTooltip>
)

export const SpellTitle = ({ spell }: { spell?: Spell }) => {
  const semanticTemplates = spell?.tooltip?.match(/(?=<).*?(?<=>)/gs)
  const spellStats = semanticTemplates
    ?.filter((m) => STAT_SEMANTIC_TEMPLATES[m])
    ?.map((m) => STAT_SEMANTIC_TEMPLATES[m])

  return (
    <>
      <p className='text-lg mb-2'>{spell?.name}</p>
      <div className='mb-2'>
        {spellStats?.map((s) => (
          <span key={s} className='text-xs'>
            {s}{' '}
          </span>
        ))}
      </div>
      <p className='mb-2'>{spell?.tooltip || spell?.description}</p>
    </>
  )
}
