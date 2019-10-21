/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useUser } from './context/user-context';
import './App.css';
import 'video.js/dist/video-js.min.css';
import './hidayahflix-v1.0.0.css';

const loadAuthenticatedApp = () => import('./components/authenticated-app');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() =>
  import('./components/unauthenticated-app')
);

function App() {
  const user = useUser();
  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <React.Suspense fallback={<FullPageSpinner />}>
      {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
    </React.Suspense>
  );
}

export default App;

/*=========================
  components/lib.js 
==========================*/
const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

export function FullPageSpinner() {
  return (
    <div
      css={{
        marginTop: '3em',
        fontSize: '4em',
        display: 'flex',
        justifyContent: 'center'
      }}
    >
      <FaSpinner
        css={{ animation: `${spin} 1s linear infinite` }}
        aria-label="loading"
      />
    </div>
  );
}
