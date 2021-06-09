import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  HStack,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from '@chakra-ui/react';
import { HiChevronDown } from 'react-icons/hi';
import { clearAllStoreValues } from 'utils/store';
import { useMutation } from 'react-query';
import queries from 'api/queries';
import { RiFileList3Line } from 'react-icons/ri';

const NavButton = ({ children, ...rest }) => (
  <Button size="sm" px="2" {...rest}>
    {children}
  </Button>
);

const NavigationMenu = () => {
  const logoutMutation = useMutation(queries.logout, {
    onSuccess: () => {
      clearAllStoreValues();
    },
  });

  return (
    <HStack width="100%" spacing={0} justifyContent="space-between" bg="gray.100" px="6" py="2">
      <Flex>
        <NavButton fontWeight="bold" fontSize="lg" alignItems="center">
          <Icon as={RiFileList3Line} mr={1} />
          <span>ledger</span>
        </NavButton>
        <Box ml={6}>
          <NavButton as={Link} to="/dashboard">
            Dashboard
          </NavButton>
        </Box>
      </Flex>
      <Menu>
        <MenuButton
          as={IconButton}
          icon={<HiChevronDown />}
          size="sm"
          aria-label="View more options"
        />
        <MenuList>
          <MenuItem as={Link} to="/settings">
            Settings
          </MenuItem>
          <MenuDivider />
          <MenuItem
            isDisabled={logoutMutation.isLoading}
            onClick={() => {
              logoutMutation.mutate();
            }}
          >
            Sign out
          </MenuItem>
        </MenuList>
      </Menu>
    </HStack>
  );
};

export default NavigationMenu;
