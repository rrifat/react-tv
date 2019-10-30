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
  const [requireRedraw, setRequireRedraw] = React.useState(false);

  // const currentRef = React.useRef();
  // React.useEffect(() => {
  //   currentRef.current = true;
  //   return () => {
  //     currentRef.current = false;
  //   };
  // }, []);

  React.useEffect(() => {
    const vjsOptions = {
      ...videoJsOptions,
      sources: [source]
    };
    let player;
    if (!requireRedraw) {
      player = videojs(videoRef.current, vjsOptions);
      player.getChild('ControlBar').addChild('vjsButton', {});
    }
    return () => {
      if (!player) {
        return;
      }
      // if (!currentRef.current) {
      //   player.dispose();
      // }
      setRequireRedraw(true);
    };
  }, [requireRedraw, source]);

  React.useEffect(() => {
    if (requireRedraw) {
      setRequireRedraw(false);
    }
  }, [requireRedraw]);

  return (
    !requireRedraw && (
      <div data-vjs-player style={{ paddingTop: '45.9%' }}>
        <video
          ref={videoRef}
          className="video-js vjs-big-play-centered"
          style={{}}
        ></video>
      </div>
    )
  );
}

export { VideoJsPlayer as default };
