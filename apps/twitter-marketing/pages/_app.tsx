// pages/_app.js
import {ChakraProvider} from '@chakra-ui/react';
import {AppProps} from 'next/app';
import type {NextPage} from 'next';
import type {ReactElement, ReactNode} from 'react';
import {RecoilRoot} from 'recoil';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import '../styles/globals.css';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
const queryClient = new QueryClient();

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({Component, pageProps}: AppPropsWithLayout) {
  //
  const getLayout = Component.getLayout || (page => page);
  return (
    <RecoilRoot>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider>
          {getLayout(<Component {...pageProps} />)}
        </ChakraProvider>
      </QueryClientProvider>
    </RecoilRoot>
  );
}

export default MyApp;
