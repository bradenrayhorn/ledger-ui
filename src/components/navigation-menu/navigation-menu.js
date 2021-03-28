import React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Flex, Icon, Text, VStack } from '@chakra-ui/react';
import { AiFillSetting, AiOutlineDashboard } from 'react-icons/ai';
import { FiLogOut } from 'react-icons/fi';
import { MdAttachMoney } from 'react-icons/md';
import { clearAllStoreValues, storageKeys } from 'utils/store';

const MenuItems = [
  {
    name: 'Dashboard',
    icon: AiOutlineDashboard,
    path: '/dashboard',
  },
  {
    name: 'Settings',
    icon: AiFillSetting,
    path: '/settings',
  },
];

const MenuButton = ({ icon, name, path, action }) => {
  const history = useHistory();
  const location = useLocation();
  const isActive = location.pathname === path;
  return (
    <Button
      height="64px"
      width="64px"
      borderRadius={0}
      onClick={() => {
        if (action) {
          action();
        } else {
          history.push(path);
        }
      }}
    >
      <VStack spacing={0}>
        <Icon as={icon} w={6} h={6} mb={1} color={isActive ? 'green.500' : 'initial'} />
        <Text fontSize="0.5em" fontWeight={isActive ? 'bold' : 'normal'}>
          {name}
        </Text>
      </VStack>
    </Button>
  );
};

const NavigationMenu = () => {
  return (
    <VStack width="64px" height="100%" spacing={0} justifyContent="space-between" bg="gray.100">
      <Flex direction="column">
        <>
          <Flex
            height="64px"
            width="64px"
            bg="green.500"
            color="white"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={MdAttachMoney} w={10} h={10} />
          </Flex>
          {MenuItems.map(MenuButton)}
        </>
      </Flex>
      <Flex>
        <MenuButton
          icon={FiLogOut}
          name="Logout"
          action={() => {
            clearAllStoreValues();
          }}
        />
      </Flex>
    </VStack>
  );
};

export default NavigationMenu;
