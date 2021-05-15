import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'styles/index.css';
import axios from 'axios';
import { clearAllStoreValues } from 'utils/store';

const serviceURLMap = {
  auth: window?._env_?.REACT_APP_BASE_URL_AUTH ?? '',
};

// resolve services to configured urls
axios.interceptors.request.use(
  (config) => {
    Object.entries(serviceURLMap).forEach(([service, url]) => {
      if (config.url.startsWith(`svc.${service}`)) {
        config.url = config.url.replace(`svc.${service}`, url);
      }
    });

    config.withCredentials = !!window?._env_?.REACT_APP_SEND_CREDENTIALS;

    return config;
  },
  (error) => Promise.reject(error)
);

// auto log out if user is unauthenticated
axios.interceptors.response.use(
  (r) => r,
  (error) => {
    if (error?.response?.status === 401) {
      clearAllStoreValues();
    }
    return Promise.reject(error);
  }
);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
