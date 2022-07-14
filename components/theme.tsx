import { createTheme, ThemeProvider } from '@mui/material/styles'
import { FC, PropsWithChildren } from 'react'

const theme = createTheme({
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        // input: {
        //   color: 'white !important',
        // },
        // popper: {
        //   color: 'white !important',
        // },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        // root: {
        //   color: 'white !important',
        // },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          // borderColor: 'white !important',
        },
      },
    },
  },
})

export const Theme: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
)
