import client from '../utils/api-client';
import { logout } from './auth-client';

function getChannelUrl(slug) {
  return client(`channel/${slug}`).catch(() => getFreshAuth(`channel/${slug}`));
}
function getChannels() {
  return client(`channel`).catch(() => getFreshAuth(`channel`));
}
function getFreshAuth(url) {
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
      return client(url).catch(err => {
        console.log('Error while getting response:', err.message);
        logout();
      });
    })
    .catch(err => {
      console.log('Error while getting new access token', err.message);
      logout();
      return Promise.reject(err);
    });
}

export { getChannels, getChannelUrl };
