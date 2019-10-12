import React from 'react';
import videojs from 'video.js';
import '../plugins/advanced-sample';
import './vjs-button';
import '../plugins/vjs-info-overlay';

function VideoJsPlayer(props) {
  let videoNode = React.useRef();
  React.useEffect(() => {
    const player = videojs(videoNode, props, function onPlayerReady() {
      console.log('onPlayerReady', this);
    });
    console.log(
      player.videoWidth(),
      player.width(),
      player.height(),
      player.videoHeight()
    );

    player.getChild('ControlBar').addChild('vjsButton', {}, -1);
    return () => {
      if (player) {
        player.dispose();
      }
    };
  });
  return (
    <div>
      <div data-vjs-player>
        <video
          ref={node => (videoNode = node)}
          className="video-js vjs-big-play-centered"
        ></video>
      </div>
    </div>
  );
}

export { VideoJsPlayer as default };
