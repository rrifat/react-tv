import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import videojs from 'video.js';
import './vjs-channel-list';

const vjsComponent = videojs.getComponent('Component');

function ChannelListButton({ player }) {
  const [toggle, setToggle] = React.useState(false);
  React.useEffect(() => {
    toggle
      ? player.addChild('vjsChannelList')
      : player.removeChild('vjsChannelList');
  }, [player, toggle]);
  function handleClick() {
    setToggle(toggle => !toggle);
  }
  return (
    <button
      className="vjs-icon-chapters"
      onClick={handleClick}
      style={{ marginTop: '.3em', fontSize: '1.8em', cursor: 'pointer' }}
    ></button>
  );
}
class vjsButton extends vjsComponent {
  constructor(player, options) {
    super(player, options);
    this.player = player;
    player.ready(() => this.mount());
    this.on('dispose', () => {
      unmountComponentAtNode(this.el());
    });
  }
  mount() {
    render(<ChannelListButton player={this.player} />, this.el());
  }
}

videojs.registerComponent('vjsButton', vjsButton);

export default vjsButton;
