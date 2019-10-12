function client(endpoint, { body, ...customConfig }) {
  const token = window.localStorage.getItem('__hidayah__iptv__');
  const headers = {
    'content-type': 'application/json'
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
    config.body = JSON.stringify(body);
  }
  console.log(`${process.env.REACT_APP_API_URL}/${endpoint}`, config);

  return window.fetch(`${process.env.REACT_APP_API_URL}/${endpoint}`, config);
}
export default client;
