import HamburgerIcon from '@/assets/icons/HamburgerIcon';
import { Menu, MenuButton, Button, MenuList, MenuItem } from '@chakra-ui/react';
import React, { FC } from 'react';

interface HamburgerDropdownProps {
  onOpen: () => void;
  logoutHandler: () => void;
}

const HamburgerDropdown: FC<HamburgerDropdownProps> = ({
  onOpen,
  logoutHandler,
}) => {
  return (
    <Menu>
      <MenuButton as={Button} display={{ md: 'none' }}>
        <HamburgerIcon styleProps={{ style: { height: '24px' } }} />
      </MenuButton>
      <MenuList gap={'1rem'}>
        <MenuItem _hover={{ fontWeight: 700 }} onClick={onOpen}>
          {' '}
          Add Product
        </MenuItem>
        <MenuItem _hover={{ fontWeight: 700 }} onClick={logoutHandler}>
          Logout
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default HamburgerDropdown;
