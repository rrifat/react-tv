import React from 'react';
import { FullPageSpinner } from './components/lib';
import { useUser } from './context/user-context';

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
