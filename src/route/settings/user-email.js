import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
} from '@chakra-ui/react';
import queries from 'api/queries';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const UserEmail = ({ userEmail }) => {
  const { handleSubmit, register, isSubmitting, setValue } = useForm();
  const toast = useToast();

  useEffect(() => {
    console.log(userEmail);
    setValue('email', userEmail ?? '');
  }, [userEmail, setValue]);

  const updateMutation = useMutation(queries.updateEmail, {
    onSuccess: () => {
      toast({
        title: 'Email updated.',
      });
    },
    onError: () => {
      toast({
        title: 'Failed to update email.',
        status: 'error',
      });
    },
  });

  return (
    <Flex as="form" onSubmit={handleSubmit(updateMutation.mutate)} width="100%">
      <FormControl>
        <FormLabel>Email</FormLabel>
        <InputGroup>
          <Input type="email" {...register('email')} />
          <InputRightElement width="4rem">
            <Button isLoading={isSubmitting}>Save</Button>
          </InputRightElement>
        </InputGroup>
        <FormHelperText>
          This email is used to share security notifications with you.
        </FormHelperText>
      </FormControl>
    </Flex>
  );
};

export default UserEmail;
