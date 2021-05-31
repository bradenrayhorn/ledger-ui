import { useEffect, useState } from 'react';
import usePrevious from 'hooks/use-previous';

const shouldShowUserMessage = (status) => status >= 400 && status <= 499;

const useErrorMessage = ({ status, error: responseError, message }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const previousStatus = usePrevious(status);

  useEffect(() => {
    if (status === 'error') {
      setErrorMessage(
        shouldShowUserMessage(responseError?.response?.status) ? message : 'Internal server error.'
      );
    } else if (previousStatus !== 'error' || status !== 'loading') {
      setErrorMessage('');
    }
  }, [status, responseError, message, previousStatus]);

  return [!!errorMessage, errorMessage];
};

export default useErrorMessage;
