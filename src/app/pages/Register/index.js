import './index.scss';

import React, { useRef, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import auth from 'authentication';

import Form from 'app/components/Common/Form';
import Field from 'app/components/Common/Field';

const passwordValidator = {
  digit: {
    expression: new RegExp('(?=.*\\d)'),
    errorMessage: 'Slaptažodis turi turėti skaičių',
  },
  uppercase: {
    expression: new RegExp('(?=.*[A-Z])'),
    errorMessage: 'Slaptažodis turi turėti didžiąją raidę',
  },
  lowercase: {
    expression: new RegExp('(?=.*[A-Z])'),
    errorMessage: 'Slaptažodis turi turėti didžiąją raidę',
  },
  length: {
    expression: new RegExp('.{8,}'),
    errorMessage: 'Slaptažodis turi būti bent 8 simbolių',
  },
};

const emailValidator = {
  expression: new RegExp(
    '^([A-Z|a-z|0-9](\\.|_){0,1})+[A-Z|a-z|0-9]\\@([A-Z|a-z|0-9])+((\\.){0,1}[A-Z|a-z|0-9]){2}\\.[a-z]{2,3}$'
  ),
  errorMessage: 'Netinkamas adresas',
};

const usernameValidator = {
  expression: new RegExp('^([A-Za-z0-9]){4,20}$'),
  errorMessage: 'Netinkamas vartotojo vardas',
};

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

    if (!usernameValidator.expression.test(credentials.username)) {
      setUsernameError(usernameValidator.errorMessage);
      console.log('bad username');
    } else if (!emailValidator.expression.test(credentials.email)) {
      setEmailError(emailValidator.errorMessage);
    } else if (!passwordValidator.length.expression.test(credentials.password)) {
      setPasswordError(passwordValidator.length.errorMessage);
    } else if (!passwordValidator.uppercase.expression.test(credentials.password)) {
      setPasswordError(passwordValidator.uppercase.errorMessage);
    } else if (!passwordValidator.lowercase.expression.test(credentials.password)) {
      setPasswordError(passwordValidator.lowercase.errorMessage);
    } else if (!passwordValidator.digit.expression.test(credentials.password)) {
      setPasswordError(passwordValidator.digit.errorMessage);
    } else if (passwordRepeatInput.current.value !== passwordInput.current.value) {
      setPasswordError('Nesutampa slaptazodziai');
      setPasswordRepeatError('Nesutampa slaptazodziai');
    } else {
      dispatch(auth.actions.register(credentials));
    }
    // dispatch(auth.actions.register(credentials)); // for testing without validation
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
        <Field input={inputs.username} error={usernameError} />
        <Field input={inputs.email} error={emailError} />
        <Field input={inputs.password} error={passwordError} />
        <Field input={inputs.repeatPassword} error={passwordRepeatError} />
      </Form>
    </main>
  );
}

export default Register;
