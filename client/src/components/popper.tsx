import { CloseOutlined } from '@mui/icons-material'
import { ClickAwayListener, Fade, Paper, Popper } from '@mui/material'
import { bindPopover, bindToggle, usePopupState } from 'material-ui-popup-state/hooks'
import { FC } from 'react'

export const EnhancedPopper: FC<{
  popupState: ReturnType<typeof usePopupState>
}> = ({ children, popupState }) => {
  return (
    <Popper {...bindPopover(popupState)} transition disablePortal className='z-10 w-96'>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper className='h-72 overflow-y-scroll p-4'>
            <ClickAwayListener onClickAway={() => popupState.setOpen(false)}>
              <div>
                <div className='flex justify-end mb-4'>
                  <CloseOutlined className='cursor-pointer' {...bindToggle(popupState)} />
                </div>
                {children}
              </div>
            </ClickAwayListener>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}
