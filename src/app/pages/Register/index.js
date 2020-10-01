import './index.scss';

import React, { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import auth from 'store/authentication';

import inputValidators from 'app/helpers/inputValidators';

import Form from 'app/components/Common/Form';
import Field from 'app/components/Common/Field';

function Register() {
  const history = useHistory();
  const authenticated = useSelector(state => !!auth.selectors.getToken(state));
  const dispatch = useDispatch();

  const registrationError = useSelector(auth.selectors.getRegisterError);

  const [usernameValue, setUsernameValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [passwordValue, setPasswordValue] = useState('');
  const [repeatPasswordValue, setRepeatPasswordValue] = useState('');

  const [inputs, setInputs] = useState({
    username: {
      id: 'username',
      labelContent: 'Vardas',
      value: usernameValue,
      setValue: setUsernameValue,
      type: 'text',
      required: true,
      autoFocus: true,
      error: null,
      validators: [
        inputValidators.minLength(4),
        inputValidators.maxLength(20),
        inputValidators.onlyLettersAndNumbers,
      ],
    },
    email: {
      id: 'email',
      labelContent: 'Elektroninis paštas',
      value: emailValue,
      setValue: setEmailValue,
      type: 'email',
      required: true,
      error: null,
      validators: [inputValidators.isValidEmail],
    },
    password: {
      id: 'password',
      labelContent: 'Slaptažodis',
      value: passwordValue,
      setValue: setPasswordValue,
      type: 'password',
      required: true,
      error: null,
      validators: [
        inputValidators.minLength(8),
        inputValidators.hasLowercase,
        inputValidators.hasUppercase,
        inputValidators.hasDigit,
      ],
    },
    repeatPassword: {
      id: 'passwordRepeat',
      labelContent: 'Pakartoti slaptažodį',
      value: repeatPasswordValue,
      setValue: setRepeatPasswordValue,
      type: 'password',
      required: true,
      error: null,
      validators: [],
    },
  });

  const [formState, setFormState] = useState({
    isValid: false,
  });

  function setValidState(isValid) {
    setFormState(state => ({ ...state, isValid }));
  }

  const setInputError = useCallback((input, error) => {
    error ? setValidState(false) : setValidState(true);
    setInputs(state => ({ ...state, [input]: { ...state[input], error } }));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const credentials = {
      email: emailValue,
      password: passwordValue,
      username: usernameValue,
      repeatPassword: repeatPasswordValue,
    };

    if (formState.isValid) {
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
      setInputError('email', 'Toks vartotojas jau egzistuoja');
    }
  }, [registrationError, setInputError]);

  return (
    <main className="Register">
      <Form onSubmit={handleSubmit} submitButtonText="Registruotis">
        {Object.keys(inputs).map(inputKey => (
          <Field
            input={inputs[inputKey]}
            key={inputKey}
            setError={value => setInputError(inputKey, value)}
          />
        ))}
      </Form>
    </main>
  );
}

export default Register;
