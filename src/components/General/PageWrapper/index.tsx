import { Box } from '@chakra-ui/react';
import React, { FC, ReactNode } from 'react';

interface PageWrapperProps {
  children: ReactNode;
  stylingProps?: object;
}

const PageWrapper: FC<PageWrapperProps> = ({ children, stylingProps }) => {
  return (
    <Box
      as="main"
      maxW={{ lg: '1080px', sm: '100%' }}
      px="1rem"
      pb={'2rem'}
      w="full"
      {...stylingProps}
    >
      {children}
    </Box>
  );
};

export default PageWrapper;
