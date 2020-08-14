import React from 'react';
import PropTypes from 'prop-types';
import './index.scss';

const Input = React.forwardRef(({ className, domProps, validateInput }, ref) => {
  const classList = className ? `Input ${className}` : 'Input';

  return (
    <input
      {...domProps}
      className={classList}
      ref={ref}
      onBlur={() => {
        validateInput(ref.current.value);
      }}
    />
  );
});

Input.propTypes = {
  className: PropTypes.string,
  domProps: PropTypes.object,
  validateInput: PropTypes.func,
};

export default Input;
