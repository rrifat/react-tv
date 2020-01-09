import client from '../utils/api-client';
import { logout } from './auth-client';

function getChannelUrl(slug) {
  return client(`channel/${slug}`).catch(err => {
    logout();
    console.log(err.response);
    return Promise.reject();
  });
}
function getChannels() {
  return client(`channel`).catch(err => {
    logout();
    console.log(err.response);
    return Promise.reject();
  });
}

export { getChannels, getChannelUrl };
