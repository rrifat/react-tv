import React from 'react';
import VideoPlayer from '../video-player';
import { Router, Redirect, Link } from '@reach/router';
import { useAuth } from '../context/auth-context';
import { IoMdLogOut } from 'react-icons/io';
import List from './list';

function RedirectToHome() {
  return <Redirect to="/channel-list" noThrow />;
}
function NotFound() {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: '50vh' }}
    >
      <h1>Page Not Found</h1>
      <h5>We couldn't find what you were looking for.</h5>
    </div>
  );
}

function AuthenticatedApp() {
  const delay = window.localStorage.getItem(
    '__hidayah__iptv__refresh__interval__'
  );

  const [userId, setUserId] = React.useState(null);
  const {
    data: { gettingFreshAuth },
    logout
  } = useAuth();

  useInterval(() => {
    gettingFreshAuth().then(
      data => {
        if (!userId) {
          setUserId(data.userid);
        }
      },
      () => logout()
    );
  }, delay);

  // React.useEffect(() => {
  //   let id = setInterval(() => {
  //     gettingFreshAuth().then(
  //       data => {
  //         if (!userId) {
  //           setUserId(data.userid);
  //         }
  //       },
  //       () => logout()
  //     );
  //   }, 10000);
  //   return () => {
  //     clearInterval(id);
  //   };
  // }, [gettingFreshAuth, logout, userId]);

  return (
    <>
      <Header />
      <main role="main">
        <Router>
          <RedirectToHome path="/" />
          <List path="/channel-list" />
          <VideoPlayer path="/channel/:slug" userId={userId} />
          <NotFound default />
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
              src={`${process.env.PUBLIC_URL}/images/logo.png`}
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

function useInterval(callback, delay) {
  const savedCallback = React.useRef();

  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  React.useEffect(() => {
    function freshAuth() {
      savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(freshAuth, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}
