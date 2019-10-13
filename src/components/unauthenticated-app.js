/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import useCallbackStatus from '../utils/use-callback-status';
import { useAuth } from '../context/auth-context';

const Div = styled.div`
  margin-top: 30px;
  padding: 25px 40px;
  background-color: #f5f5f5;
`;
const Form = styled.form`
  padding: 15px;
  margin: auto;
`;
const formControlSignIn = css`
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 10px;
  border-radius: 0;
  &:focus {
    z-index: 2;
  }
`;

function SignIn() {
  const { run, isPending, error } = useCallbackStatus();
  const { login } = useAuth();

  function handleSubmit(e) {
    e.preventDefault();
    const { inputText, inputPassword } = e.target.elements;
    run(login({ username: inputText.value, password: inputPassword.value }));
  }
  return (
    <Div>
      <Form css={formControlSignIn} onSubmit={handleSubmit}>
        <img
          className="mb-4"
          src={process.env.PUBLIC_URL + '/images/Jadoo-Broadband-Logo.png'}
          alt=""
          width="350"
          height="200"
        />
        <h1 className="h3 mb-3 font-weight-normal text-center">
          Please sign in
        </h1>
        <label htmlFor="inputUsername" className="sr-only">
          Username
        </label>
        <input
          type="text"
          id="inputText"
          className="form-control"
          placeholder="Username"
          required
          autoFocus
          css={formControlSignIn}
        />
        <label htmlFor="inputPassword" className="sr-only">
          Password
        </label>
        <input
          type="password"
          id="inputPassword"
          className="form-control"
          placeholder="Password"
          required
          css={formControlSignIn}
        />
        {error && <p css={{ color: 'red' }}>{error.message}</p>}
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          css={{ borderRadius: 0 }}
        >
          {isPending ? 'Loading' : 'Sign in'}
        </button>
      </Form>
    </Div>
  );
}

function UnauthenticatedApp() {
  return <SignIn />;
}
export default UnauthenticatedApp;
