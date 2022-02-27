import classNames from 'classnames'
import React, { MouseEvent, useEffect, useState } from 'react'

const Tabs = ({ options }: { options: { tab: string; content: any }[] }) => {
  const [selectedTab, setSelectedTab] = useState<string>()

  useEffect(() => {
    if (!selectedTab) setSelectedTab(options[0].tab)
  }, [options])

  const onClick = (e: MouseEvent<HTMLSpanElement>) => setSelectedTab(e.currentTarget.id)

  return (
    <div>
      <div className='mb-2'>
        {options.map((t) => (
          <span
            className={classNames(
              'mr-2 font-montserrat cursor-pointer text-lg text-gray-800',
              t.tab === selectedTab && 'underline',
            )}
            key={t.tab}
            id={t.tab}
            onClick={onClick}
          >
            {t.tab}
          </span>
        ))}
      </div>
      <div>{options.find((o) => o.tab === selectedTab)?.content}</div>
    </div>
  )
}

export default Tabs
