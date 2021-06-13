import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  Spinner,
  Text,
} from '@chakra-ui/react';
import { MdClose, MdCheck } from 'react-icons/md';
import queries from 'api/queries';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation } from 'react-query';

const UserEmail = ({ userEmail }) => {
  const {
    handleSubmit,
    register,
    isSubmitting,
    formState: { isDirty },
    reset,
  } = useForm();

  useEffect(() => {
    reset({ email: userEmail ?? '' });
  }, [userEmail, reset]);

  const updateMutation = useMutation(queries.updateEmail, {
    onSuccess: (_, { email }) => {
      reset({ email });
    },
  });

  return (
    <Flex as="form" onSubmit={handleSubmit(updateMutation.mutate)} width="100%">
      <FormControl>
        <Flex mr="3" mb="2" alignItems="center" flexDir="row">
          <FormLabel my="0">Email</FormLabel>
          {updateMutation.isLoading && <Spinner size="sm" />}
          {updateMutation.isSuccess && (
            <>
              <Icon as={MdCheck} color="green.500" />
              <Text color="green.500" fontSize="sm" ml="1">
                Email updated
              </Text>
            </>
          )}
          {updateMutation.isError && (
            <>
              <Icon as={MdClose} color="red.500" />
              <Text color="red.500" fontSize="sm" ml="1">
                Failed to update email
              </Text>
            </>
          )}
        </Flex>
        <InputGroup>
          <Input type="email" {...register('email')} />
          <Button
            isDisabled={!isDirty || isSubmitting || updateMutation.isLoading}
            type="submit"
            ml="4"
          >
            Save
          </Button>
        </InputGroup>
        <FormHelperText>
          This email is used to share security notifications with you.
        </FormHelperText>
      </FormControl>
    </Flex>
  );
};

export default UserEmail;
