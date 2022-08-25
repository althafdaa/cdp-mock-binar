import React, { FC } from 'react';
import { Center } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  const router = useRouter();
  const publicPaths = ['/', '/register'];

  const nonAuth = publicPaths.some((item) => item === router.asPath);
  return (
    <Center
      mx={'auto'}
      bg="gray.100"
      position={'relative'}
      display="flex"
      flexDirection={'column'}
    >
      {!nonAuth && <Navbar />}

      {children}
    </Center>
  );
};

export default Wrapper;
