import api from './api';

// set the auth token for current user
const setAuthToken = token => {
  if (token) {
    api.defaults.headers.common['auth-token'] = token;
    localStorage.setItem('token', token);
  } else {
    delete api.defaults.headers.common['auth-token'];
    localStorage.removeItem('token');
    localStorage.removeItem('email');
  }
};

export default setAuthToken;