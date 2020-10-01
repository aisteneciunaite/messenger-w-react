import './index.scss';

import React, { useRef, useEffect, useState, useCallback } from 'react';
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

  const [inputs, setInputs] = useState({
    username: {
      id: 'username',
      labelContent: 'Vardas',
      type: 'text',
      required: true,
      ref: useRef(null),
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
      type: 'email',
      required: true,
      ref: useRef(null),
      error: null,
      validators: [inputValidators.isValidEmail],
    },
    password: {
      id: 'password',
      labelContent: 'Slaptažodis',
      type: 'password',
      required: true,
      ref: useRef(null),
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
      type: 'password',
      required: true,
      ref: useRef(null),
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
    const { username, email, password, repeatPassword } = inputs;
    const credentials = {
      email: email.ref.current.value,
      password: password.ref.current.value,
      username: username.ref.current.value,
      repeatPassword: repeatPassword.ref.current.value,
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

  useEffect(() => {
    inputs.username.ref.current.focus();
  }, [inputs.username.ref]);

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
