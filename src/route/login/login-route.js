import React from 'react';
import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import { setStoreValue, storageKeys } from 'utils/store';
import axios from 'axios';

const LoginRoute = () => {
  return (
    <Center height="100%">
      <VStack>
        <Heading>Ledger</Heading>
        <Button
          onClick={() => {
            axios
              .post('svc.auth/api/v1/auth/login', {
                username: 'tom',
                password: 'password',
              })
              .then(() => {
                setStoreValue(storageKeys.isLoggedIn, true);
              })
              .catch((e) => {
                console.log(e);
              });
          }}
        >
          Click to Login
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginRoute;
