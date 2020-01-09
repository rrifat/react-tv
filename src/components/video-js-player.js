import React from 'react';
import videojs from 'video.js';
import './vjs-button';
import '../plugins/vjs-info-overlay';
import '@videojs/http-streaming';

function VideoJsPlayer({ source, userId }) {
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
      const vjsOptions = getVjsOptions();
      player = videojs(videoRef.current, vjsOptions, () => {
        player.src(source);
        player.volume(0.2);
      });
      if (!player.getChild('ControlBar').getChild('vjsButton')) {
        player.getChild('ControlBar').addChild('vjsButton', {});
      }
      userId && player.addChild('VjsInfoOverlay', { username: userId });
    }
    return () => {
      if (player && !sourceRef.current) {
        player.dispose();
      }
    };
  }, [source, userId]);

  return (
    <div data-vjs-player style={{ paddingTop: 0, height: '90.5vh' }}>
      <video ref={videoRef} className="video-js vjs-big-play-centered" />
    </div>
  );
}

export { VideoJsPlayer as default };

function getVjsOptions() {
  let videoJsOptions = {
    autoplay: true,
    preload: 'auto',
    controls: true,
    controlBar: {
      pictureInPictureToggle: false
    },
    responsive: true,
    fluid: true,
    liveui: true
  };
  // if (userId) {
  //   videoJsOptions = {
  //     ...videoJsOptions,
  //     vjsInfoOverlay: { username: userId }
  //   };
  // }
  return videoJsOptions;
}
