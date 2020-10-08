import React, { useState } from 'react';
import './index.scss';

import Input from '../Input';

import InputObj from './inputObjInterface';

import icon from 'app/assets/icons/eye.svg';

interface FieldProps {
  input: InputObj;
  setError?: (x: string | null) => void;
  className?: string;
}

function Field({ input, setError, className }: FieldProps) {
  const classes = className ? `Field ${className}` : 'Field';

  const [inputType, setInputType] = useState(input.type);

  function validateInput(inputValue: string) {
    for (let i = 0; !input.error && input.validators && i < input.validators.length; i++) {
      const validator = input.validators[i];
      if (!validator.expression.test(inputValue)) {
        setError && setError(validator.errorMessage);
      }
    }
  }

  function togglePasswordDisplay() {
    inputType === 'password' ? setInputType('text') : setInputType('password');
  }

  return (
    <div className={classes}>
      {input.labelContent && (
        <label className="Field__label" htmlFor={input.id}>
          {input.labelContent}
        </label>
      )}

      <div className="Field__box">
        <div className="Field__error">{input.error}</div>
        <Input
          setValue={input.setValue}
          domProps={{
            type: inputType,
            id: input.id,
            autoFocus: input.autoFocus,
            defaultValue: input.default,
            required: input.required,
            onChange: (e: { target: { value: string } }) => {
              setError && setError(null);
              input.setValue(e.target.value);
            },
          }}
          validateInput={validateInput}
        />
        {input.type === 'password' && (
          <img
            className="Field__icon"
            src={icon}
            alt=""
            onMouseDown={togglePasswordDisplay}
            onMouseUp={togglePasswordDisplay}
          />
        )}
      </div>
    </div>
  );
}

export default Field;
