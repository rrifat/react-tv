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
  muted: true,
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
  const currentRef = React.useRef();
  const videoRef = React.useRef();
  const [requireRedraw, setRequireRedraw] = React.useState(false);

  React.useEffect(() => {
    currentRef.current = true;
    return () => {
      currentRef.current = false;
    };
  }, []);

  React.useEffect(() => {
    const vjsOptions = {
      ...videoJsOptions,
      sources: [source]
    };
    let player;
    if (!requireRedraw) {
      player = videojs(videoRef.current, vjsOptions);
      // player.getChild('ControlBar').addChild('vjsButton', {});
    }
    return () => {
      if (!player) {
        return;
      }
      if (currentRef.current) {
        setRequireRedraw(true);
      }
    };
  }, [videoRef, requireRedraw, source]);

  React.useEffect(() => {
    if (requireRedraw) {
      setRequireRedraw(false);
    }
  }, [requireRedraw]);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-12 mt-2">
          {!requireRedraw && (
            <div data-vjs-player>
              <video
                ref={videoRef}
                className="video-js vjs-big-play-centered"
              ></video>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export { VideoJsPlayer as default };
