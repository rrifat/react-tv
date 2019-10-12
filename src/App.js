import React from 'react';
import VideoPlayer from './video-player';
import { Router, Redirect } from '@reach/router';
import SignIn from './components/sign-in';

import './App.css';
import 'video.js/dist/video-js.min.css';

const fakeAuth = {
  isAuthenticated: false
};
function App() {
  return (
    <div className="App">
      <Router>
        <SignIn path="/" />
        <PrivateRoute path="player" component={VideoPlayer} />
      </Router>
    </div>
  );
}
function PrivateRoute({ component: Component, ...rest }) {
  return fakeAuth.isAuthenticated ? <Component /> : <Redirect to="/" noThrow />;
}
export default App;
