import React from 'react';
import './index.scss';

interface InputPropsObj {
  className?: string;
  domProps: any;
  value?: string;
  setValue?: any;
  validateInput?: any;
}

function Input({ className, domProps, value, validateInput }: InputPropsObj) {
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

export default Input;
