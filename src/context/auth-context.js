import React from 'react';
import { useAsync } from 'react-async';
import { FullPageSpinner } from '../components/lib';
import * as authClient from '../utils/auth-client';

const AuthContext = React.createContext();

async function bootstrapData() {
  const data = await authClient.getUser();

  if (!data) {
    return { user: false };
  }
  const { user } = data;
  return {
    user
  };
}

function AuthProvider(props) {
  const [firstAttemptFinished, setFirstAttemptFinished] = React.useState(false);
  const { data, error, isRejected, isPending, isSettled, reload } = useAsync({
    promiseFn: bootstrapData
  });

  React.useLayoutEffect(() => {
    if (isSettled) {
      setFirstAttemptFinished(true);
    }
  }, [isSettled]);

  if (!firstAttemptFinished) {
    if (isPending) {
      return <FullPageSpinner />;
    }
    if (isRejected) {
      return (
        <div css={{ color: 'red' }}>
          <p>Uh oh... There's a problem. Try refreshing the app.</p>
          <pre>{error.message}</pre>
        </div>
      );
    }
  }

  const login = form => authClient.login(form).then(reload);
  const logout = () => authClient.logout().then(reload);

  return (
    <AuthContext.Provider
      value={{
        login,
        data,
        logout
      }}
      {...props}
    />
  );
}

function useAuth() {
  const context = React.useContext(AuthContext);
  if (context === undefined) {
    throw new Error(`useAuth must be within AuthProvider`);
  }
  return context;
}

export { AuthProvider, useAuth };
