import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      drawer: {
        width: number
      }
      card: {
        width: number
        height: number
        image: {
          height: number
        }
      }
    }
  }
  interface ThemeOptions {
    custom?: {
      drawer?: {
        width?: number
      }
      card?: {
        width?: number
        height?: number
        image?: {
          height?: number
        }
      }
    }
  }
}

const theme = createTheme({
  custom: {
    drawer: {
      width: 240
    },
    card: {
      width: 200,
      height: 200,
      image: {
        height: 100
      }
    }
  },
  components: {
    MuiListItemButton: {
      styleOverrides: {
        root: {
          paddingTop: 4,
          paddingBottom: 4,
          minHeight: 32
        }
      }
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: 32
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem'
        }
      }
    }
  }
})

export default theme
