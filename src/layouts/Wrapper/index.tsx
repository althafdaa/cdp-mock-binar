import React, { FC } from 'react';
import { Center } from '@chakra-ui/react';

interface WrapperProps {
  children: React.ReactNode;
}

const Wrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <Center
      mx={'auto'}
      bg="gray.100"
      position={'relative'}
      display="flex"
      flexDirection={'column'}
    >
      {children}
    </Center>
  );
};

export default Wrapper;
