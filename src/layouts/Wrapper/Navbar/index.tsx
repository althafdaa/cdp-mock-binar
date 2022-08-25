import { Box, Button, Heading, useToast } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { destroyCookie } from 'nookies';
import React, { FC } from 'react';

interface NavbarProps {
  stylingProps?: object;
}

const Navbar: FC<NavbarProps> = ({ stylingProps }) => {
  const router = useRouter();
  const toast = useToast();

  const logoutHandler = () => {
    destroyCookie(null, 'token');

    toast({
      title: 'Logged out',
      status: 'success',
      duration: 1000,
      isClosable: true,
      position: 'top-right',
    });

    router.push('/');
  };

  return (
    <>
      <Box
        as="nav"
        position={'absolute'}
        top="0"
        left={'0'}
        right="0"
        p="2rem"
        display={'flex'}
        borderBottom="0.5px"
        boxShadow={'sm'}
        justifyContent="center"
        {...stylingProps}
      >
        <Box
          maxW="1080px"
          w="full"
          display={'flex'}
          justifyContent="space-between"
        >
          <Heading>Product List</Heading>

          <Button colorScheme={'pink'} onClick={logoutHandler}>
            Logout
          </Button>
        </Box>
      </Box>
      <Box pt={'130px'}></Box>
    </>
  );
};

export default Navbar;
