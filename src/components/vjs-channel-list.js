import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import videojs from 'video.js';

const vjsComponent = videojs.getComponent('Component');

function ChannelList({ player }) {
  function handleClick(event) {
    event.preventDefault();
    player.src(event.target.parentNode.href);
    player.removeChild('vjsChannelList');
  }

  return (
    <div
      style={{
        width: '200px',
        height: '37.4vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: '40px',
        right: '10px',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column'
        // alignItems: 'center'
      }}
    >
      <div>
        <a
          onClick={handleClick}
          href="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          style={{
            fontSize: '1.7em',
            textDecoration: 'none',
            color: '#fff'
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/atn_news.png'}
            alt="ATN News"
            style={{
              width: '150px',
              height: '90px',
              position: 'relative',
              left: '16px',
              top: '2px'
            }}
          />
          {/* <span>Channel A</span> */}
        </a>
      </div>
      <hr></hr>
      <div>
        <a
          onClick={handleClick}
          href="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
          style={{
            fontSize: '1.7em',
            textDecoration: 'none',
            color: '#fff'
          }}
        >
          <img
            src={process.env.PUBLIC_URL + '/images/colors_bangla.png'}
            alt="ATN News"
            style={{
              width: '150px',
              height: '90px',
              position: 'relative',
              left: '16px',
              top: '2px'
            }}
          />
          {/* <span>Channel A</span> */}
        </a>
      </div>
    </div>
  );
}

class vjsChannelList extends vjsComponent {
  constructor(player, options) {
    super(player, options);
    this.newPlayer = player;
    player.ready(() => this.mount());
    this.on('dispose', () => {
      unmountComponentAtNode(this.el());
    });
  }
  mount() {
    render(<ChannelList player={this.newPlayer} />, this.el());
  }
}

videojs.registerComponent('vjsChannelList', vjsChannelList);

export default vjsChannelList;
