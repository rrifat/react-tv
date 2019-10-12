import React from 'react';
import VideoJsPlayer from './components/video-js-player';

const videoJsOptions = {
  autoplay: true,
  preload: 'auto',
  controls: true,
  controlBar: {
    pictureInPictureToggle: false
  },
  sources: [
    {
      // src: '//vjs.zencdn.net/v/oceans.mp4',
      src:
        'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4'
    }
  ],
  responsive: true,
  // fluid: true,
  liveui: true,
  vjsInfoOverlay: {
    ispname: 'digi digital digi dalkjalkdfkladflk',
    username: 'abc3809'
  },
  width: '750px',
  height: '421.88px'
};

function VideoPlayer(props) {
  return <VideoJsPlayer {...videoJsOptions} />;
}

export default VideoPlayer;
