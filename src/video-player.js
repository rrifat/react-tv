import React from 'react';
import VideoJsPlayer from './components/video-js-player';
import List from './components/list';
import client from './utils/api-client';
import { useAuth } from './context/auth-context';

const defaultSource = {
  src: 'https://edge01.iptv.digijadoo.net/live/atn_news/playlist.m3u8',
  type: 'application/x-mpegURL'
};
function VideoPlayer() {
  const { logout } = useAuth();
  const [source, setSource] = React.useState(defaultSource);

  function handleClickChannel(channelSlug) {
    client(`channel/${channelSlug}`)
      .then(({ data }) => {
        setSource({ ...source, src: data.url });
      })
      .catch(() => {
        client('auth/refresh', {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              '__hidayah__iptv__refresh'
            )}`
          }
        }).then(
          ({ data }) => {
            const { data: auth } = data;
            window.localStorage.setItem('__hidayah__iptv__', auth.access_token);
          },
          err => {
            console.log(err);
            logout();
            return Promise.reject(err);
          }
        );
      });
  }
  return (
    <>
      <VideoJsPlayer source={source} />
      <List onClickChannel={handleClickChannel} />
    </>
  );
}

export default VideoPlayer;
