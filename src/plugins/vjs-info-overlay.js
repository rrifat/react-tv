import React from 'react';
import { render } from 'react-dom';
import videojs from 'video.js';

const Component = videojs.getComponent('Component');

function InfoOverlay({ options: { username } }) {
  return (
    <div
      style={{
        zIndex: 9999,
        color: 'rgba(252, 252, 252, 0.5)',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        fontSize: '1.5em',
        position: 'absolute',
        padding: '10px',
        right: '10%',
        top: '5%',
        boxSizing: 'border-box',
        display: 'inline-block'
      }}
    >
      <h4 style={{ flexGrow: 1 }}>{username}</h4>
    </div>
  );
}
class VjsInfoOverlay extends Component {
  constructor(player, options) {
    super(player, options);
    this.componentOptions = options;
    player.ready(() => {
      this.mount();
    });
  }
  mount() {
    render(<InfoOverlay options={this.componentOptions} />, this.el());
  }
}

videojs.registerComponent('VjsInfoOverlay', VjsInfoOverlay);
export default VjsInfoOverlay;
