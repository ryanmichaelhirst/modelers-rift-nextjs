import { STAT_SEMANTIC_TEMPLATES } from '@customtypes/constants'
import Tippy from '@tippyjs/react'
import React from 'react'

const ellipsisStyle = {
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical' as any,
  WebkitLineClamp: 3,
}

const SpellRow = ({
  spellKey,
  image,
  title,
  tooltip,
}: {
  spellKey: string
  image: { src: string; h: string; w: string }
  tooltip: string
  title?: string
}) => {
  const semanticTemplates = tooltip.match(/(?=<).*?(?<=>)/gs)
  const spellStats = semanticTemplates
    .filter((m) => STAT_SEMANTIC_TEMPLATES[m])
    .map((m) => STAT_SEMANTIC_TEMPLATES[m])
  const singleStat = spellStats.length >= 1 ? spellStats[0] : undefined
  // console.log(semanticTemplates, spellStats)

  return (
    <div className='flex mb-3 bg-blue-100 h-14 rounded font-montserrat'>
      <img className='mr-3 border-2 border-yellow-100 rounded shadow' src={image.src} />
      <Tippy content={tooltip} placement='right-start'>
        <div className='overflow-hidden' style={{ ...ellipsisStyle }}>
          {title && <p className='text-lg text-yellow-300 font-semibold'>{title}</p>}
          <div className='flex text-xs'>
            <div className='flex'>
              <span className='px-2 bg-yellow-300 rounded-l'>Key</span>
              <span className='px-2 bg-black text-white rounded-r'>{spellKey}</span>
            </div>
            <div className='ml-2 px-2 rounded bg-red-200'>
              {singleStat && <span>{singleStat}</span>}
            </div>
          </div>
        </div>
      </Tippy>
    </div>
  )
}

export default SpellRow
