import '../styles/globals.css';
import { ChakraProvider } from '@chakra-ui/react';
import type { AppType } from 'next/dist/shared/lib/utils';
import { QueryClientProvider, QueryClient } from 'react-query';
import Wrapper from '../layouts/Wrapper';

const MyApp: AppType = ({ Component, pageProps }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Wrapper>
          <Component {...pageProps} />
        </Wrapper>
      </ChakraProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
