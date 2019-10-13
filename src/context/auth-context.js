import React from 'react';
import client from '../utils/api-client';
import { useAsync } from 'react-async';

const AuthContext = React.createContext();

function getUser() {
  const token = window.localStorage.getItem('__hidayah__iptv__refresh');
  if (!token) {
    return Promise.resolve({ user: false });
  }
  return Promise.resolve({ user: true }).catch(error => Promise.reject(error));
}
// async function bootstrapData() {
//   const data = await getUser();
//   if (!data) {
//     return { user: false };
//   }
//   const { user } = data;
//   return {
//     user
//   };
// }

function AuthProvider(props) {
  const { data = { user: false }, reload } = useAsync({
    promiseFn: getUser
  });

  const login = ({ username, password }) =>
    client('login', { body: { username, password } })
      .then(({ data: { data } }) => {
        const { refresh_token } = data;
        console.log(refresh_token);

        window.localStorage.setItem('__hidayah__iptv__refresh', refresh_token);

        return data;
      })
      .then(reload);

  return (
    <AuthContext.Provider
      value={{
        login,
        data
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
  console.log(context);

  return context;
}

export { AuthProvider, useAuth };
