import React from 'react';
import VideoJsPlayer from './components/video-js-player';
import * as channelClient from './utils/channel-client';
import { useAuth } from './context/auth-context';

function VideoPlayer({ slug, userId }) {
  const [source, setSource] = React.useState({});
  const { logout } = useAuth();
  React.useEffect(() => {
    let mounted = true;
    channelClient.getChannelUrl(slug).then(
      ({ data } = {}) => {
        mounted &&
          setSource({
            type: data && data.type,
            src: data && data.url
          });
      },
      _ => logout()
    );
    return () => (mounted = false);
  }, [slug, logout]);

  return (
    <div className="container-fluid">
      <div className="row">
        <VideoJsPlayer source={source} userId={userId} />
      </div>
    </div>
  );
}

export default VideoPlayer;
