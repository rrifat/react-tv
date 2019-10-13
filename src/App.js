/** @jsx jsx */
import { jsx, keyframes } from '@emotion/core';
import React from 'react';
import { useAuth } from './context/auth-context';
import { FaSpinner } from 'react-icons/fa';

import './App.css';
import 'video.js/dist/video-js.min.css';

const loadAuthenticatedApp = () => import('./components/authenticated-app');
const AuthenticatedApp = React.lazy(loadAuthenticatedApp);
const UnauthenticatedApp = React.lazy(() =>
  import('./components/unauthenticated-app')
);

const spin = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' }
});

export function FullPageSpinner() {
  return (
    <div css={{ marginTop: '3em', fontSize: '4em' }}>
      <FaSpinner
        css={{ animation: `${spin} 1s linear infinite` }}
        aria-label="loading"
      />
    </div>
  );
}

function App() {
  const {
    data: { user }
  } = useAuth();

  React.useEffect(() => {
    loadAuthenticatedApp();
  }, []);

  return (
    <div className="App">
      <React.Suspense fallback={<FullPageSpinner />}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </React.Suspense>
      {/* <Router>
        <SignIn path="/" />
        <PrivateRoute
          path="player"
          component={VideoPlayer}
          token={refreshToken}
        />
      </Router> */}
    </div>
  );
}
// function PrivateRoute({ component: Component, token, ...rest }) {
//   return token ? <Component /> : <Redirect to="/" noThrow />;
// }
export default App;
