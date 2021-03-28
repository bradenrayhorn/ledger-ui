import json2Plugin from 'store/plugins/json2';
import observePlugin from 'store/plugins/observe';
import { createStore } from 'store/src/store-engine';
import allStorages from 'store/storages/all';
import memoryStorage from 'store/storages/memoryStorage';

let store;

const storePlugins = [json2Plugin, observePlugin];

const getStore = () => {
  if (!store) {
    store = createStore(allStorages, storePlugins);
  }
  return store;
};

const createMockStore = () => {
  store = createStore(memoryStorage, storePlugins);
};

const setStoreValue = (storageKey, value) => getStore().set(storageKey, value);

const getStoreValue = (storageKey) => getStore().get(storageKey);

const clearStoreValue = (storageKey) => getStore().remove(storageKey);

const observeStoreValue = (storageKey, callback) => getStore().observe(storageKey, callback);

const unobserveStoreValue = (observerID) => getStore().unobserve(observerID);

const storageKeys = {
  authToken: 'auth_token',
};

export {
  storageKeys,
  createMockStore,
  getStoreValue,
  setStoreValue,
  clearStoreValue,
  observeStoreValue,
  unobserveStoreValue,
};
