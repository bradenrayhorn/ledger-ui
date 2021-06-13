import axios from 'axios';

const queryKeys = {
  activeSessions: 'activeSessions',
};

const queries = {
  logout: () => axios.post('svc.auth/api/v1/auth/logout'),
  login: ({ username, password }) =>
    axios.post('svc.auth/api/v1/auth/login', { username, password }),
  revoke: () => axios.post('svc.auth/api/v1/auth/revoke'),
  updateEmail: ({ email }) => axios.post('svc.auth/api/v1/me/email', { email }),
  [queryKeys.activeSessions]: () => axios.get('svc.auth/api/v1/sessions'),
};

export default queries;
export { queryKeys };
