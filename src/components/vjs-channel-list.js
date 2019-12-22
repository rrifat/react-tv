/**@jsx jsx */
import { jsx } from '@emotion/core';
import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import videojs from 'video.js';
import * as channelClient from '../utils/channel-client';
import { Link } from '@reach/router';

const vjsComponent = videojs.getComponent('Component');

function ChannelList() {
  const [channels, setChannels] = React.useState([]);
  React.useEffect(() => {
    channelClient.getChannels().then(({ data }) => {
      const {
        data: { channels }
      } = data;
      setChannels(channels);
    });
  }, []);

  return (
    <div
      className="d-flex align-items-center"
      css={{
        width: '100%',
        height: '23vh',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        position: 'absolute',
        bottom: '50px',
        right: '0px',
        left: '0px',
        overflowX: 'scroll',
        '&::-webkit-scrollbar-track': {
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.3)',
          borderRadius: '10px',
          backgroundColor: '#F5F5F5'
        },
        '&::-webkit-scrollbar': {
          backgroundColor: '#555'
        },
        '&::-webkit-scrollbar-thumb': {
          borderRadius: '8px',
          WebkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,.3)',
          backgroundColor: '#b7090b'
        }
      }}
    >
      {channels.map(channel => (
        <Link to={`/channel/${channel.slug}`} key={channel.slug}>
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.5)'
            }}
          >
            <img
              src={channel.logo}
              alt={channel.name}
              width="200px"
              height="200px"
            />
          </div>
        </Link>
      ))}
    </div>
  );
}
class vjsChannelList extends vjsComponent {
  constructor(player, options) {
    super(player, options);
    player.ready(() => this.mount());
    this.on('dispose', () => {
      unmountComponentAtNode(this.el());
    });
  }
  mount() {
    render(<ChannelList />, this.el());
  }
}

videojs.registerComponent('vjsChannelList', vjsChannelList);

export default vjsChannelList;
