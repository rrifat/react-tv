import React from 'react';
import videojs from 'video.js';
import '../plugins/advanced-sample';
import './vjs-button';
import '../plugins/vjs-info-overlay';
import '@videojs/http-streaming';

const videoJsOptions = {
  autoplay: true,
  preload: 'auto',
  controls: true,
  controlBar: {
    pictureInPictureToggle: false
  },
  responsive: true,
  fluid: true,
  liveui: true
  // vjsInfoOverlay: {
  //   ispname: 'digi digital digi dalkjalkdfkladflk',
  //   username: 'abc3809'
  // }
};

function VideoJsPlayer({ source }) {
  const videoRef = React.useRef();
  const sourceRef = React.useRef(source);

  React.useEffect(() => {
    return () => {
      sourceRef.current = null;
    };
  }, []);
  React.useEffect(() => {
    let player;
    if (source.src) {
      player = videojs(videoRef.current, videoJsOptions, () => {
        player.src(source);
        player.volume(0.2);
      });
      if (!player.getChild('ControlBar').getChild('vjsButton')) {
        player.getChild('ControlBar').addChild('vjsButton', {});
      }
    }
    return () => {
      if (player && !sourceRef.current) {
        player.dispose();
      }
    };
  }, [source]);

  return (
    <div data-vjs-player style={{ paddingTop: 0, height: '90.5vh' }}>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

export { VideoJsPlayer as default };
