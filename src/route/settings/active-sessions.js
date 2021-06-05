import React from 'react';
import { Skeleton, Box, Text } from '@chakra-ui/react';
import queries, { queryKeys } from 'api/queries';
import { useQuery } from 'react-query';
import dayjs from 'dayjs';

const ActiveSessions = () => {
  const { isLoading, data } = useQuery(queryKeys.activeSessions, queries.activeSessions, {
    select: (data) =>
      data?.data?.sessions?.sort((a, b) =>
        dayjs(a.last_accessed).isBefore(dayjs(b.last_accessed)) ? 1 : -1
      ),
  });

  return (
    <Skeleton isLoaded={!isLoading} width="100%">
      {data?.map((s) => (
        <Box
          key={s.identifier}
          p="4"
          border="1px"
          borderColor="gray.400"
          bg="gray.50"
          borderRadius="md"
          my="2"
        >
          <Box>
            <Text fontWeight="semibold">{s.ip}</Text>
          </Box>
          <Box mt="1" fontSize="sm">
            <Box>Last accessed at {dayjs(s.last_accessed).format('MMM D, YYYY h:mm a')}</Box>
            <Box>Created at {dayjs(s.created_at).format('MMM D, YYYY h:mm a')}</Box>
          </Box>
        </Box>
      ))}
    </Skeleton>
  );
};

export default ActiveSessions;
