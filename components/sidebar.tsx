import { AddReaction, Backpack, MenuBook, Videocam } from '@mui/icons-material'
import { Grid, Skeleton } from '@mui/material'
import { useAppContext } from '../context'

const staticItems = [
  {
    label: 'Items',
    value: 'Ruby Crystal',
    icon: Backpack,
  },
  {
    label: 'Animations',
    value: 'Play All',
    icon: Videocam,
  },
  {
    label: 'Lore',
    value: 'Read biography',
    icon: MenuBook,
  },
]

export const Sidebar = () => {
  const [{ selectedChampion }, dispatch] = useAppContext()

  const items = [
    {
      label: 'Champion',
      value: selectedChampion.basicInfo?.id,
      icon: AddReaction,
    },
  ].concat(staticItems)

  return (
    <div className='h-full border border-white text-gray-300'>
      {items.map((i) => {
        const Icon = i.icon

        return (
          <Grid item container xs={12} key={i.label} className='border-b border-gray-600 p-4'>
            <Grid item xs={4}>
              <Icon style={{ color: '#fff' }} />
            </Grid>
            <Grid item xs={8}>
              <div>{i.label}</div>
              {i.value ? (
                <div className='text-lg'>{i.value}</div>
              ) : (
                <Skeleton style={{ backgroundColor: '#fff' }} />
              )}
            </Grid>
          </Grid>
        )
      })}
    </div>
  )
}
