// pages/_app.js
import {ChakraProvider} from '@chakra-ui/react';
import {AppProps} from 'next/app';
import type {NextPage} from 'next';
import type {ReactElement, ReactNode} from 'react';
import {RecoilRoot} from 'recoil';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  //
  const getLayout = Component.getLayout || (page => page);
  return (
    <RecoilRoot>
      <ChakraProvider>{getLayout(<Component {...pageProps} />)}</ChakraProvider>
    </RecoilRoot>
  );
}

export default MyApp;
