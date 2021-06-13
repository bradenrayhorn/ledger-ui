import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  useToast,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import ActiveSessions from './active-sessions';
import { useMutation } from 'react-query';
import queries from 'api/queries';
import { clearAllStoreValues } from 'utils/store';
import UserEmail from './user-email';

const SettingsRoute = () => {
  const [user, setUser] = useState({});

  const toast = useToast();

  const revokeMutation = useMutation(queries.revoke, {
    onSuccess: () => {
      clearAllStoreValues();
    },
    onError: () => {
      toast({ status: 'error', title: 'Failed to revoke sessions.' });
    },
  });

  useEffect(() => {
    axios
      .get('svc.auth/api/v1/me')
      .then((response) => {
        setUser(response.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box h="100%" w="100%" pt="16">
      <Container>
        <Flex alignItems="flex-start" flexDir="column">
          <Heading>Settings</Heading>
          <VStack width="100%" mt="4">
            <FormControl>
              <FormLabel>User ID</FormLabel>
              <Input size="md" isReadOnly value={user.id ?? ''} />
            </FormControl>
          </VStack>

          <Flex width="100%" mt="6">
            <UserEmail userEmail={user.email} />
          </Flex>

          <Flex align="center" justifyContent="space-between" mt="12" width="100%">
            <Heading size="md">Sessions</Heading>
            <Button
              colorScheme="red"
              isLoading={revokeMutation.isLoading}
              onClick={() => revokeMutation.mutate()}
            >
              Revoke All
            </Button>
          </Flex>
          <Divider mt="2" />
          <ActiveSessions />
        </Flex>
      </Container>
    </Box>
  );
};

export default SettingsRoute;
