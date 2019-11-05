import client from '../utils/api-client';

function handleReponse({ data }) {
  const { data: auth } = data;
  window.localStorage.setItem('__hidayah__iptv__', auth.access_token);
  window.localStorage.setItem('__hidayah__iptv__refresh__', auth.refresh_token);

  return data;
}

function getUser() {
  const token = getToken();
  if (!token) {
    // return Promise.resolve({ user: false });
    return Promise.resolve(null);
  }
  return Promise.resolve({ user: true }).catch(error => {
    logout();
    return Promise.reject(error);
  });
}
function login({ username, password }) {
  return client('auth/login', { body: { username, password } }).then(
    handleReponse
  );
}
function logout() {
  window.localStorage.removeItem('__hidayah__iptv__refresh__');
  return Promise.resolve();
}
function getToken() {
  return window.localStorage.getItem('__hidayah__iptv__refresh__');
}

export { getUser, login, logout };
