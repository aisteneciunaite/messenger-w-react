import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import Input from '../Input';

import icon from 'app/assets/icons/eye.svg';

function Field({ input, setError, className }) {
  const classes = className ? `Field ${className}` : 'Field';

  const [inputType, setInputType] = useState(input.type);

  function validateInput(inputValue) {
    for (let i = 0; !input.error && input.validators && i < input.validators.length; i++) {
      const validator = input.validators[i];
      if (!validator.expression.test(inputValue)) {
        setError(validator.errorMessage);
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
            onChange: e => {
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

Field.propTypes = {
  setError: PropTypes.func,
  input: PropTypes.shape({
    id: PropTypes.string.isRequired,
    labelContent: PropTypes.string,
    type: PropTypes.oneOf(['email', 'number', 'password', 'search', 'text']).isRequired,
    icon: PropTypes.string,
    autoFocus: PropTypes.bool,
    required: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
  }),
};

export default Field;
