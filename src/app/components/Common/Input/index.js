import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './index.scss';
import icon from '../../../assets/icons/eye-icon.svg'; //'../../images/eye-icon.svg';

function Input(props) {
  const { id, labelContent, type, ref, className } = props.input;
  const classes = props.className ? `Input ${className}` : 'Input';

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
        className="Input__icon"
        src={icon}
        alt=""
        onMouseDown={togglePasswordDisplay}
        onMouseUp={togglePasswordDisplay}
      />
    );
  } else if (props.icon) {
    iconElement = <img className="Input__icon" src={props.icon} alt="" />;
  }

  return (
    <div className={classes}>
      {labelContent && (
        <label className="Input__label" htmlFor={id}>
          {labelContent}
        </label>
      )}
      <div className="Input__box">
        <input className="Input__element" type={state.type} id={id} ref={ref} />
        {iconElement}
        {props.children}
      </div>
    </div>
  );
}

Input.propTypes = {
  input: PropTypes.exact({
    id: PropTypes.string.isRequired,
    labelContent: PropTypes.string,
    type: PropTypes.oneOf(['email', 'number', 'password', 'search', 'text']).isRequired,
    icon: PropTypes.string,
    autoFocus: PropTypes.bool,
    ref: PropTypes.any,
  }),
};

export function Radio() {
  return <input type="radio"></input>;
}

export default Input;
