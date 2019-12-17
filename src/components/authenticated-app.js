import React from 'react';
import VideoPlayer from '../video-player';
import { Router, Redirect, Link } from '@reach/router';
import { useAuth } from '../context/auth-context';
import { IoMdLogOut } from 'react-icons/io';
import List from './list';

function RedirectToHome() {
  return <Redirect to="channel-list" noThrow />;
}

function AuthenticatedApp() {
  return (
    <>
      <Header />
      <main role="main">
        <Router>
          <RedirectToHome path="/" />
          <List path="channel-list" />
          <VideoPlayer path="channel/:slug" />
        </Router>
      </main>
    </>
  );
}
function Header() {
  const { logout } = useAuth();
  return (
    <header>
      <div className="navbar navbar-dark bg-dark box-shadow">
        <div className="container d-flex justify-content-between">
          <Link to="/">
            <img
              src="/images/logo.png"
              width="130"
              height="75"
              alt="Jadoo Broadband"
            />
          </Link>

          <button
            className="btn btn-outline-secondary btn-lg"
            type="button"
            onClick={logout}
            style={{ borderRadius: '50%', width: '50px', height: '50px' }}
          >
            <span>
              <IoMdLogOut style={{ margin: '2px -4px', fontSize: '1.3em' }} />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

export default AuthenticatedApp;
