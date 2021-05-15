import useLocalStorageValue from 'hooks/use-local-storage-value';
import { storageKeys } from 'utils/store';

const useIsLoggedIn = () => {
  return !!useLocalStorageValue(storageKeys.isLoggedIn);
};

export default useIsLoggedIn;
