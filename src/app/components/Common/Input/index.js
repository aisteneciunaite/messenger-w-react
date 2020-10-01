import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

function Input({ className, domProps, value, validateInput }) {
  const classList = className ? `Input ${className}` : 'Input';

  return (
    <input
      {...domProps}
      className={classList}
      value={value}
      onBlur={e => {
        validateInput && validateInput(e.target.value);
      }}
    />
  );
}

Input.propTypes = {
  className: PropTypes.string,
  domProps: PropTypes.object,
  validateInput: PropTypes.func,
};

export default Input;
