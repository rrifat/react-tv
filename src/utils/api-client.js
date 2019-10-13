import axios from 'axios';

function client(endpoint, { body, ...customConfig } = {}) {
  const token = window.localStorage.getItem('__hidayah__iptv__');
  const headers = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  };
  if (body) {
    config.data = JSON.stringify(body);
  }

  return axios(`${process.env.REACT_APP_API_URL}/${endpoint}`, config);
}
export default client;
