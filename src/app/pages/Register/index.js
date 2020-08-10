import './index.scss';

import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import auth from 'authentication';

import Form from 'app/components/Common/Form';
import Input from 'app/components/Common/Input';

function Register() {
  const history = useHistory();
  const authenticated = useSelector(state => !!auth.selectors.getToken(state));
  const dispatch = useDispatch();

  const registrationError = useSelector(auth.selectors.getRegisterError);

  const usernameInput = useRef(null);
  const [usernameError, setUsernameError] = useState(null);
  const emailInput = useRef(null);
  const [emailError, setEmailError] = useState(null);
  const passwordInput = useRef(null);
  const [passwordError, setPasswordError] = useState(null);
  const passwordRepeatInput = useRef(null);
  const [passwordRepeatError, setPasswordRepeatError] = useState(null);

  const inputs = {
    username: {
      id: 'username',
      labelContent: 'Vardas',
      type: 'text',
      required: true,
      ref: usernameInput,
    },
    email: {
      id: 'email',
      labelContent: 'Elektroninis paštas',
      type: 'text',
      required: true,
      ref: emailInput,
    },
    password: {
      id: 'password',
      labelContent: 'Slaptažodis',
      type: 'password',
      required: true,
      ref: passwordInput,
    },
    repeatPassword: {
      id: 'passwordRepeat',
      labelContent: 'Pakartoti slaptažodį',
      type: 'password',
      required: true,
      ref: passwordRepeatInput,
    },
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailInput.current.value,
      password: passwordInput.current.value,
      username: usernameInput.current.value,
      passwordRepeat: passwordRepeatInput.current.value,
    };

    if (passwordRepeatInput.current.value !== passwordInput.current.value) {
      setPasswordError('Nesutampa slaptazodziai');
      setPasswordRepeatError('Nesutampa slaptazodziai');
    } else {
      dispatch(auth.actions.register(credentials));
    }
  }

  useEffect(() => {
    authenticated && history.replace('/');
  }, [history, authenticated]);

  useEffect(() => {
    if (
      registrationError &&
      registrationError.name === 'MongoError' &&
      registrationError.code === 11000
    ) {
      setEmailError('Toks vartotojas jau egzistuoja');
    }
  }, [registrationError]);

  useEffect(() => {
    usernameInput.current.focus();
  }, []);

  return (
    <main className="Register">
      <Form onSubmit={handleSubmit} submitButtonText="Registruotis">
        <Input input={inputs.username} error={usernameError} />
        <Input input={inputs.email} error={emailError} />
        <Input input={inputs.password} error={passwordError} />
        <Input input={inputs.repeatPassword} error={passwordRepeatError} />
      </Form>
    </main>
  );
}

export default Register;
