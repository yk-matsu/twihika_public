// pages/_app.js
import { ChakraProvider } from '@chakra-ui/react'
import { AppProps } from 'next/app'
import type { NextPage } from 'next'
import type { ReactElement, ReactNode } from 'react'
import "@cloudscape-design/global-styles/index.css"



export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement, pageProps: any) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  //
  const getLayout = Component.getLayout || ((page) => page)
  return (
    <ChakraProvider>
      {getLayout(<Component {...pageProps} />, pageProps)}
    </ChakraProvider>
  )
}

export default MyApp
