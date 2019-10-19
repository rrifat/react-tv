import React from 'react';

function ChannelList({ channels, handleClickChannel }) {
  return channels.map(channel => (
    <div
      className="card"
      key={channel.uid}
      style={{ width: '18rem', cursor: 'pointer' }}
      onClick={() => handleClickChannel(channel.slug)}
    >
      <div style={{ height: '100%' }}>
        <img src={channel.logo} className="img-responsive" alt="..." />
      </div>
    </div>
  ));
}
export default ChannelList;
