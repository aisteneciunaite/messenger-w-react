import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Input = React.forwardRef(({ type, id, value, required, className }, ref) => {
  const classList = className ? `Input ${className}` : 'Input';
  return (
    <input
      className={classList}
      type={type}
      id={id}
      ref={ref}
      defaultValue={value}
      required={required}
    />
  );
});

Input.propTypes = {
  input: PropTypes.exact({
    id: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['email', 'number', 'password', 'search', 'text']).isRequired,
    ref: PropTypes.any,
    required: PropTypes.bool,
    value: PropTypes.string,
    error: PropTypes.string,
  }),
};

export default Input;
