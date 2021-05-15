import React, { useEffect, useState } from 'react';
import { Box, Code, Heading } from '@chakra-ui/react';
import axios from 'axios';

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
    <Box>
      <Heading>Settings</Heading>
      <Code>{userID}</Code>
    </Box>
  );
};

export default SettingsRoute;
