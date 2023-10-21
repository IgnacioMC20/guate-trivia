import { CssBaseline, ThemeProvider } from '@mui/material'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'

import { UIProvider } from '@/context'
import { lightTheme } from '@/themes'
import '@/styles/globals.css'
import 'react-toastify/dist/ReactToastify.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={lightTheme}>
      <UIProvider>
        <ToastContainer />
        <CssBaseline />
        <Component {...pageProps} />
      </UIProvider>
    </ThemeProvider>
  )

}
