import React from 'react';
import { Link } from '@reach/router';
function ChannelList({ channels }) {
  return channels.map(channel => (
    <Link
      to={`/channel/${channel.slug}`}
      key={channel.uid}
      style={{ textDecoration: 'none' }}
    >
      <div
        className="card"
        style={{
          width: '16rem',
          height: '16.2rem',
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.5)'
        }}
      >
        <img src={channel.logo} className="img-responsive" alt={channel.name} />
        <div className="card-body">
          <p className="card-title font-weight-bold text-center">
            {channel.name}
          </p>
        </div>
      </div>
    </Link>
  ));
}
export default ChannelList;
