import './index.scss';

import React, { useEffect, useState } from 'react';
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

  const [emailValue, setEmailValue] = useState(null);
  const [passwordValue, setPasswordValue] = useState(null);

  const inputs = [
    {
      id: 'email',
      value: emailValue,
      setValue: setEmailValue,
      labelContent: 'Elektroninis paštas',
      type: 'email',
      required: true,
      autoFocus: true,
    },
    {
      id: 'password',
      value: passwordValue,
      setValue: setPasswordValue,
      labelContent: 'Slaptažodis',
      type: 'password',
      required: true,
    },
  ];

  function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailValue,
      password: passwordValue,
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

  return (
    <main className="Login">
      <Form
        errorMessage={!!status.error && 'Login failed'}
        onSubmit={handleSubmit}
        submitButtonText="Prisijungti"
      >
        {inputs.map(input => (
          <Field input={input} key={input.id} />
        ))}
      </Form>
    </main>
  );
}

export default Login;
