import { useEffect, useState } from 'react';
import { getStoreValue, observeStoreValue, unobserveStoreValue } from 'utils/store';

const useLocalStorageValue = (storageKey) => {
  const [value, setValue] = useState(getStoreValue(storageKey));

  useEffect(() => {
    const observerID = observeStoreValue(storageKey, (newValue) => {
      setValue(newValue);
    });
    return () => {
      unobserveStoreValue(observerID);
    };
  }, [storageKey]);

  return value;
};

export default useLocalStorageValue;
