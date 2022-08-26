import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import { QueryClientProvider, QueryClient, Hydrate } from 'react-query';
import Wrapper from '../layouts/Wrapper';
import { useState } from 'react';

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider>
          <Wrapper>
            <Component {...pageProps} />
          </Wrapper>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  );
};

export default MyApp;
