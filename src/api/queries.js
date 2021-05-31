import axios from 'axios';

const queries = {
  logout: () => axios.post('svc.auth/api/v1/auth/logout'),
  login: ({ username, password }) => axios.post('svc.auth/api/v1/auth/login', { username, password }),
};

export default queries;
