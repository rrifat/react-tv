/**@jsx jsx */
import { jsx, css } from '@emotion/core';
import styled from '@emotion/styled';
import client from '../utils/api-client';

const Div = styled.div`
  display: flex;
  /* -ms-flex-align: center; */
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
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
  function handleSubmit(e) {
    e.preventDefault();
    const { inputText, inputPassword } = e.target.elements;
    client('login', {
      body: { username: inputText.value, password: inputPassword.value }
    })
      .then(res => res.json())
      .then(data => console.log(data));
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
        <label htmlFor="inputEmail" className="sr-only">
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
        {/* <div className="checkbox mb-3">
    <label>
      <input type="checkbox" value="remember-me"> Remember me
    </label>
  </div> */}
        <button
          className="btn btn-lg btn-primary btn-block"
          type="submit"
          css={{ borderRadius: 0 }}
        >
          Sign in
        </button>
        {/* <p className="mt-5 mb-3 text-muted text-center">&copy; 2019</p> */}
      </Form>
    </Div>
  );
}

export default SignIn;
