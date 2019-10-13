import React from 'react';
import VideoPlayer from '../video-player';
import { Router, Redirect } from '@reach/router';

function RedirectToHome() {
  return <Redirect to="/player" noThrow />;
}

function AuthenticatedApp() {
  return (
    <Router>
      <RedirectToHome path="/" />
      <VideoPlayer path="/player" />
    </Router>
  );
}
export default AuthenticatedApp;
