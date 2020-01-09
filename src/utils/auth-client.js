import client from '../utils/api-client';

function handleResponse({ data }) {
  const { data: auth } = data;
  window.localStorage.setItem('__hidayah__iptv__', auth.access_token);
  window.localStorage.setItem('__hidayah__iptv__refresh__', auth.refresh_token);
  const intervalInMilSec = auth.refreshInterval * 1000;
  window.localStorage.setItem(
    '__hidayah__iptv__refresh__interval__',
    intervalInMilSec
  );
  return auth;
}

function getUser() {
  const token = getToken();
  if (!token) {
    return Promise.resolve(null);
  }
  return Promise.resolve({ user: true, gettingFreshAuth }).catch(error => {
    logout();
    return Promise.reject(error);
  });
}

function login({ username, password }) {
  return getDomain().then(domain => {
    return client('auth/login', {
      body: { username, password, domain }
    }).then(handleResponse);
  });
}

function logout() {
  window.localStorage.removeItem('__hidayah__iptv__');
  window.localStorage.removeItem('__hidayah__iptv__refresh__');
  window.localStorage.removeItem('__hidayah__iptv__refresh__interval__');
  return Promise.resolve();
}
function getToken() {
  return window.localStorage.getItem('__hidayah__iptv__refresh__');
}

function getDomain() {
  return fetch(`${process.env.PUBLIC_URL}/domain.txt`)
    .then(response => response.text())
    .then(text => text);
}

function gettingFreshAuth() {
  return client('auth/refresh', {
    headers: {
      Authorization: `Bearer ${window.localStorage.getItem(
        '__hidayah__iptv__refresh__'
      )}`
    }
  })
    .then(({ data }) => {
      const { data: auth } = data;
      window.localStorage.setItem('__hidayah__iptv__', auth.access_token);
      return auth;
    })
    .catch(err => {
      console.log('Error while getting new access token', err.response);
      logout();
      return Promise.reject(err);
    });
}

export { getUser, login, logout, gettingFreshAuth };
