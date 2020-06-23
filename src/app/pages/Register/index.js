import './index.scss';

import React, { useRef, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import auth from '../../../authentication';

import Form from '../../components/Form';
import Input from '../../components/Input';

// const SERVER_URL = 'http://localhost:4000';
// const REGISTER_ENDPOINT = '/user/register';

function Register() {
  const history = useHistory();
  const authenticated = useSelector(state => !!auth.selectors.getToken(state));
  const dispatch = useDispatch();
  const usernameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  const passwordRepeatInput = useRef(null);

  const inputs = [
    {
      id: 'username',
      labelContent: 'Vardas',
      type: 'text',
      ref: usernameInput,
    },
    {
      id: 'email',
      labelContent: 'Elektroninis paštas',
      type: 'text',
      ref: emailInput,
    },
    {
      id: 'password',
      labelContent: 'Slaptažodis',
      type: 'password',
      ref: passwordInput,
    },
    {
      id: 'passwordRepeat',
      labelContent: 'Pakartoti slaptažodį',
      type: 'password',
      ref: passwordRepeatInput,
    },
  ];

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      username: usernameInput.current.value,
    };

    try {
      if (!credentials.password || !credentials.email)
        throw new Error('Username and password can not be blank');

      // const response = await fetch(SERVER_URL + REGISTER_ENDPOINT, {
      //   method: 'POST',
      //   body: JSON.stringify(credentials),
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });
      // if (!response.ok) throw response;
      // history.push('/login');

      dispatch(auth.actions.register(credentials));
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
    <main className="Register">
      <Form onSubmit={handleSubmit} submitButtonText="Registruotis">
        {inputs.map(input => (
          <Input input={input} key={input.id} />
        ))}
      </Form>
    </main>
  );
}

export default Register;
