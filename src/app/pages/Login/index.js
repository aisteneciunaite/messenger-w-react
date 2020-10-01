import './index.scss';

import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import auth from 'store/authentication';

import Form from 'app/components/Common/Form';
import Field from 'app/components/Common/Field';

function Login() {
  const dispatch = useDispatch();
  const history = useHistory();
  const authenticated = useSelector(state => !!auth.selectors.getToken(state));
  const status = useSelector(state => auth.selectors.getStatus(state));

  const usernameInput = useRef(null);
  const passwordInout = useRef(null);

  const inputs = [
    {
      id: 'email',
      labelContent: 'Email',
      type: 'email',
      ref: usernameInput,
      required: true,
    },
    {
      id: 'password',
      labelContent: 'Password',
      type: 'password',
      ref: passwordInout,
      required: true,
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: usernameInput.current.value,
      password: passwordInout.current.value,
    };

    try {
      if (!credentials.password || !credentials.email)
        throw new Error('Username and password can not be blank');
      dispatch(auth.actions.login(credentials));
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    authenticated && history.replace('/');
  }, [history, authenticated]);

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  return (
    <main className="Login">
      <Form
        errorMessage={!!status.error && 'Login failed'}
        onSubmit={handleSubmit}
        submitButtonText="Sign In"
      >
        {inputs.map(input => (
          <Field input={input} key={input.id} />
        ))}
      </Form>
    </main>
  );
}

export default Login;
