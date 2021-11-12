import { AddReaction, Backpack, MenuBook, Videocam } from '@mui/icons-material'
import { Grid } from '@mui/material'

const items = [
  {
    label: 'Champion',
    value: 'Aatrox',
    icon: AddReaction,
  },
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

export const Sidebar = () => (
  <div className='bg-gray-800 h-full border border-white'>
    {items.map((i) => {
      const Icon = i.icon

      return (
        <Grid container xs={12} key={i.label} className='border-b border-gray-600 p-4'>
          <Grid item xs={4}>
            <Icon style={{ color: '#ffffff' }} />
          </Grid>
          <Grid item xs={8}>
            <div>{i.label}</div>
            <div className='text-lg'>{i.value}</div>
          </Grid>
        </Grid>
      )
    })}
  </div>
)
