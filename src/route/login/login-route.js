import React from 'react';
import {
  Alert,
  AlertDescription,
  AlertIcon,
  Button,
  Center,
  CloseButton,
  FormControl,
  FormLabel,
  Heading,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import queries from 'api/queries';
import { setStoreValue, storageKeys } from 'utils/store';
import useErrorMessage from 'hooks/use-error-message';

const LoginRoute = () => {
  const { handleSubmit, register } = useForm();

  const loginMutation = useMutation(queries.login, {
    onSuccess: () => {
      setStoreValue(storageKeys.isLoggedIn, true);
    },
  });

  const onSubmit = ({ username, password }) => {
    loginMutation.mutate({ username, password });
  };

  const [showError, error] = useErrorMessage({
    ...loginMutation,
    message: 'Incorrect username or password.',
  });

  return (
    <Center height="100%" bg="gray.50">
      <VStack>
        <Heading size="md">Login to Ledger</Heading>
        {showError && (
          <Alert status="error">
            <AlertIcon />
            <AlertDescription>{error}</AlertDescription>
            <CloseButton ml="1rem" onClick={() => loginMutation.reset()} />
          </Alert>
        )}
        <VStack
          align="flex-start"
          bg="white"
          p="3"
          borderRadius="sm"
          width="100%"
          as="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input size="md" {...register('username')} />
          </FormControl>
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" size="md" {...register('password')} />
          </FormControl>
          <Button
            type="submit"
            isLoading={loginMutation.isLoading}
            colorScheme="green"
            width="100%"
            mt="4"
          >
            Login
          </Button>
        </VStack>
      </VStack>
    </Center>
  );
};

export default LoginRoute;
