import React from 'react';
import { Link } from '@reach/router';
function ChannelList({ channels }) {
  return channels.map(channel => (
    <Link
      to={`/channel/${channel.slug}`}
      key={channel.slug}
      style={{ textDecoration: 'none' }}
    >
      <div
        className="card"
        style={{
          width: '16rem',
          height: '16.2rem',
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.5)',
          marginBottom: '5px',
          marginRight: '5px'
        }}
      >
        <img
          src={channel.logo}
          className="img-responsive"
          alt={channel.name}
          widht="100%"
          height="100%"
        />
      </div>
    </Link>
  ));
}
export default ChannelList;
