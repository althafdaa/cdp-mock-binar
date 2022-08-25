import { Box } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
}

const PageWrapper: FC<PageWrapperProps> = ({ children }) => {
  return (
    <Box as="main" maxW="1080px" w="full">
      {children}
    </Box>
  );
};

export default PageWrapper;
