import React from 'react';
import { Center, Heading, Box } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Center h="100%">
      <Box>
        <Box>
          <Heading>404</Heading>
        </Box>
        <Box>Page not found.</Box>
      </Box>
    </Center>
  );
};

export default NotFoundPage;
