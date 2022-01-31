import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

export const DropdownMenu: React.FC<{
  anchorEl?: Element | null
  open: boolean
  onClose: (event: {}, reason: 'backdropClick' | 'escapeKeyDown') => void
  onClick: React.MouseEventHandler<HTMLElement> | undefined
  options: string[]
}> = ({ anchorEl, open, onClose, onClick, options }) => (
  <Menu anchorEl={anchorEl} open={open} onClose={onClose}>
    {options.map((opt) => (
      <MenuItem key={opt} onClick={onClick}>
        <div>
          <span className='ml-3'>{opt}</span>
        </div>
      </MenuItem>
    ))}
  </Menu>
)
