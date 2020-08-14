import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';

import Input from '../Input';

import icon from 'app/assets/icons/eye.svg';

function Field(props) {
  const { id, labelContent, type, ref, className } = props.input;
  const classes = className ? `Field ${className}` : 'Field';

  const [state, setstate] = useState({ type: props.input.type });

  function togglePasswordDisplay() {
    setstate(prevState => {
      let newType = prevState.type === 'password' ? 'text' : 'password';
      return { ...prevState, type: newType };
    });
  }

  let iconElement;

  if (type === 'password') {
    iconElement = (
      <img
        className="Field__icon"
        src={icon}
        alt=""
        onMouseDown={togglePasswordDisplay}
        onMouseUp={togglePasswordDisplay}
      />
    );
  } else if (props.icon) {
    iconElement = <img className="Field__icon" src={props.icon} alt="" />;
  }

  return (
    <div className={classes}>
      {labelContent && (
        <label className="Field__label" htmlFor={id}>
          {labelContent}
        </label>
      )}

      <div className="Field__box">
        <div className="Field__error">{props.error}</div>
        <Input
          type={state.type}
          id={id}
          ref={ref}
          defaultValue={props.input.value}
          required={props.input.required}
        />
        {iconElement}
      </div>
    </div>
  );
}

Field.propTypes = {
  input: PropTypes.exact({
    id: PropTypes.string.isRequired,
    labelContent: PropTypes.string,
    type: PropTypes.oneOf(['email', 'number', 'password', 'search', 'text']).isRequired,
    icon: PropTypes.string,
    autoFocus: PropTypes.bool,
    ref: PropTypes.any,
    required: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
  }),
};

export default Field;
