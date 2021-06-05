import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import axios from 'axios';
import ActiveSessions from './active-sessions';

const SettingsRoute = () => {
  const [userID, setUserID] = useState('');

  useEffect(() => {
    axios
      .get('svc.auth/api/v1/me')
      .then((response) => {
        setUserID(response.data.id);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Box h="100%" w="100%" pt="16">
      <Container>
        <VStack alignItems="flex-start">
          <Heading>Settings</Heading>
          <VStack width="100%">
            <FormControl>
              <FormLabel>User ID</FormLabel>
              <Input size="md" isReadOnly value={userID} />
            </FormControl>
          </VStack>

          <Heading size="md" pt="12">
            Sessions
          </Heading>
          <Divider />
          <ActiveSessions />
        </VStack>
      </Container>
    </Box>
  );
};

export default SettingsRoute;
