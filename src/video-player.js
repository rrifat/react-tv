import React from 'react';
import VideoJsPlayer from './components/video-js-player';
import * as channelClient from './utils/channel-client';

function VideoPlayer({ slug }) {
  const [source, setSource] = React.useState({});

  React.useEffect(() => {
    channelClient.getChannelUrl(slug).then(({ data } = {}) => {
      setSource({
        type: data && data.type,
        src: data && data.url
      });
    });
  }, [slug]);

  return (
    <div className="container-fluid">
      <div className="row">
        <VideoJsPlayer source={source} />
      </div>
    </div>
  );
}

export default VideoPlayer;
