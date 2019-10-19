import React from 'react';
import VideoPlayer from '../video-player';
import { Router, Redirect } from '@reach/router';
import { useAuth } from '../context/auth-context';
import { IoMdLogOut } from 'react-icons/io';

function RedirectToHome() {
  return <Redirect to="/player" noThrow />;
}
function AuthenticatedApp() {
  return (
    <>
      <Header />
      <main role="main">
        <Router>
          <RedirectToHome path="/" />
          <VideoPlayer path="/player" />
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
          <img
            src={`${process.env.PUBLIC_URL}/images/Jadoo-Broadband-Logo.png`}
            width="150"
            alt="Jadoo"
          />

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
