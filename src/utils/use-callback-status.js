import React from 'react';

function useIsMounted() {
  const isMount = React.useRef(false);
  React.useLayoutEffect(() => {
    isMount.current = true;
    return () => (isMount.current = false);
  }, []);
  return isMount;
}

function useCallbackStatus() {
  const isMounted = useIsMounted();
  const [{ status, error }, setState] = React.useReducer(
    (state, action) => ({ ...state, ...action }),
    { error: null, status: 'rest' }
  );
  const safeSetSatus = (...args) =>
    isMounted.current ? setState(...args) : null;
  const isPending = status === 'pending';
  const isRejected = status === 'rejected';

  function run(promise) {
    if (!promise || !promise.then) {
      throw new Error(
        `Argument passed to useCallbackStatus().run must be a promise.`
      );
    }
    safeSetSatus({ status: 'pending' });

    return promise.then(
      value => {
        setState({ status: 'rest' });
        return value;
      },
      error => {
        return handleError(error, setState);
      }
    );
  }
  return {
    run,
    isPending,
    isRejected,
    error
  };
}
export default useCallbackStatus;

function handleError(error, setState) {
  if (error.response) {
    setState({ error: error.response.data });
  } else if (error.request) {
    console.log('Request error', error.request);
    setState({ error });
  } else {
    setState({ error });
  }
  setState({ status: 'rejected' });

  return Promise.reject(error);
}
