import { AnimationTable } from '@components/animation-table'
import { AssetTable } from '@components/asset-table'
import { AssetType } from '@customtypes/constants'
import { useCharacterQuery } from '@graphql/generated/types'
import { Tab, Tabs, tabsClasses } from '@mui/material'
import { FC, PropsWithChildren, SyntheticEvent, useState } from 'react'

const TabPanel: FC<PropsWithChildren<{ index: number; value: number; className?: string }>> = ({
  children,
  index,
  value,
  className,
}) => {
  return (
    <div role='tabpanel' hidden={value !== index} className={className}>
      {value === index && <div>{children}</div>}
    </div>
  )
}

export const ModelTabs = ({ data }: { data: ReturnType<typeof useCharacterQuery>['data'] }) => {
  const [tab, setTab] = useState(0)

  const onChange = (e: SyntheticEvent, value: number) => setTab(value)

  const assets = data?.character?.assets?.filter((a) => {
    return [AssetType.SFX, AssetType.VO].includes(a?.type as AssetType)
  })

  return (
    <>
      <Tabs
        variant='scrollable'
        scrollButtons={true}
        value={tab}
        onChange={onChange}
        classes={{ indicator: 'bg-primary', scrollButtons: 'text-primary' }}
        sx={{
          [`& .${tabsClasses.scrollButtons}`]: {
            '&.Mui-disabled': { opacity: 0.3 },
          },
        }}
      >
        <Tab label='All' value={0} classes={{ root: '!text-primary', selected: '!text-primary' }} />
        <Tab
          label='Voice-lines'
          value={1}
          classes={{ root: '!text-primary', selected: '!text-primary' }}
        />
        <Tab
          label='Sound-effects'
          value={2}
          classes={{ root: '!text-primary', selected: '!text-primary' }}
        />
        <Tab
          label='Animations'
          value={3}
          classes={{ root: '!text-primary', selected: '!text-primary' }}
        />
        <Tab
          label='Interactions'
          value={4}
          classes={{ root: '!text-primary', selected: '!text-primary' }}
        />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <AssetTable data={assets} />
      </TabPanel>
      <TabPanel value={tab} index={1}>
        <AssetTable data={assets?.filter((a) => a?.type === AssetType.VO)} />
      </TabPanel>
      <TabPanel value={tab} index={2}>
        <AssetTable data={assets?.filter((a) => a?.type === AssetType.SFX)} />
      </TabPanel>
      <TabPanel value={tab} index={3}>
        <AnimationTable />
      </TabPanel>
      <TabPanel value={tab} index={4}>
        Coming Soon!
      </TabPanel>
    </>
  )
}
