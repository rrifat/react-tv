import videojs from 'video.js';
const Plugin = videojs.getPlugin('plugin');

class AdvancedSample extends Plugin {
  constructor(player, option) {
    super(player, option);
    this.on(player, ['playing', 'pause'], this.updateStatus);
    this.on('statechanged', this.logState);
  }
  dispose() {
    super.dispose();
    videojs.log(`the advanced plugin is beign disposed`);
  }
  updateStatus(e) {
    this.setState({ playing: !this.player.paused() });
  }
  logState(event) {
    videojs.log(
      `the player is now ${this.state.playing ? 'playing' : 'paused'}`
    );
  }
}
// Functional Plugin
// const AdvancedSampleFunc = videojs.extend(Plugin, {
//   constructor: function(player, option) {
//     Plugin.call(this, player, option);

//     this.on(player, ['playing', 'pause'], this.updateStatus);
//     this.on('statechanged', this.logState);
//   },
//   dispose() {
//     super.dispose();
//     videojs.log(`the advanced plugin is beign disposed`);
//   },
//   updateStatus() {
//     this.setState({ playing: !this.player.paused() });
//   },
//   logState() {
//     videojs.log(
//       `the player is now ${this.state.playing ? 'playing' : 'paused'}`
//     );
//   }
// });
videojs.registerPlugin('advanced', AdvancedSample);

export default AdvancedSample;
