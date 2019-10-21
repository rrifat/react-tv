import React from 'react';
import { Link } from '@reach/router';
function ChannelList({ channels }) {
  return channels.map(channel => (
    <Link to={`/channel/${channel.slug}`} key={channel.uid}>
      <div
        className="card"
        style={{
          width: '18rem',
          cursor: 'pointer',
          border: '1px solid rgba(0, 0, 0, 0.5)'
        }}
      >
        <img src={channel.logo} className="img-responsive" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{channel.name}</h5>
        </div>
      </div>
    </Link>
  ));
}
export default ChannelList;
