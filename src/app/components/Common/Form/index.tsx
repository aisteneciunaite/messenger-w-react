import './index.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

interface FormPropsObj {
  className?: string;
  onSubmit: ((event: React.FormEvent<HTMLFormElement>) => void) | undefined;
  children: React.ReactNode;
  errorMessage?: React.ReactNode;
  submitButtonText: any;
}

function Form(props: FormPropsObj) {
  const classes = props.className ? `Form ${props.className}` : 'Form';
  return (
    <form className={classes} onSubmit={props.onSubmit}>
      {props.children}
      {props.errorMessage && <span className="Form__alert">{props.errorMessage}</span>}
      <Button type="submit">{props.submitButtonText}</Button>{' '}
    </form>
  );
}

Form.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
};

export default Form;
