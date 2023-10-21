import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'

import { UIProvider } from '@/context'
import { lightTheme } from '@/themes'
import '@/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <UIProvider>

        <CssBaseline />
        <Component {...pageProps} />
      </UIProvider>
    </ThemeProvider>
  )

}
