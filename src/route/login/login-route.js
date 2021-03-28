import React from 'react';
import { Button, Center, Heading, VStack } from '@chakra-ui/react';
import { setStoreValue, storageKeys } from 'utils/store';

const LoginRoute = () => {
  return (
    <Center height="100%">
      <VStack>
        <Heading>Ledger</Heading>
        <Button
          onClick={() => {
            setStoreValue(storageKeys.authToken, 'x');
          }}
        >
          Click to Login
        </Button>
      </VStack>
    </Center>
  );
};

export default LoginRoute;
