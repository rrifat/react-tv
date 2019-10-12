import React from 'react';
import ReactDOM from 'react-dom';
import videojs from 'video.js';

const vjsComponent = videojs.getComponent('Component');

function TitleBar({ options }) {
  const text =
    typeof options.text !== 'string' ? 'Unknown Title' : options.text;

  return <div className="vjs-title-bar">{text}</div>;
}

class vjsTitleBar extends vjsComponent {
  constructor(player, options) {
    super(player, options);
    this.componentOptions = options;
    /* When player is ready, call method to mount React component */
    player.ready(() => {
      this.mount();
    });
    /* Remove React root when component is destroyed */
    this.on('dispose', () => {
      ReactDOM.unmountComponentAtNode(this.el());
    });
  }

  mount = () => {
    ReactDOM.render(
      <TitleBar vjsComponent={this} options={this.componentOptions} />,
      this.el()
    );
  };
}

videojs.registerComponent('vjsTitleBar', vjsTitleBar);

export default vjsTitleBar;
