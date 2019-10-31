import React from 'react';
import VideoJsPlayer from './components/video-js-player';
import * as channelClient from './utils/channel-client';

// const defaultSource = {
//   src: 'https://edge01.iptv.digijadoo.net/live/atn_news/playlist.m3u8',
//   type: 'application/x-mpegURL'
// };

function VideoPlayer({ slug }) {
  const [source, setSource] = React.useState();

  React.useEffect(() => {
    channelClient.getChannelUrl(slug).then(({ data } = {}) => {
      setSource({
        type: 'application/x-mpegURL',
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
