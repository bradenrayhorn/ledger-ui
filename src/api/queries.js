import axios from 'axios';

const queries = {
  logout: () => axios.post('svc.auth/api/v1/auth/logout')
};

export default queries;
