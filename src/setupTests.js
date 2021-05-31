// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { createMockStore } from 'utils/store';
import nock from 'nock';
import axios from 'axios';

axios.defaults.adapter = require('axios/lib/adapters/http');
axios.defaults.baseURL = 'http://x.x';

createMockStore();

beforeEach(() => {
  if (!nock.isActive()) {
    nock.activate();
  }
});

afterEach(() => {
  nock.restore();
});
