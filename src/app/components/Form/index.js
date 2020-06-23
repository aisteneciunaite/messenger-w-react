import './index.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function Form(props) {
  const classes = props.className ? `Form ${props.className}` : 'Form';
  return (
    <form className={classes}>
      {props.children}
      <span className="Form__alert">{props.errorMessage}</span>
      <Button onClick={props.onSubmit}>{props.submitButtonText}</Button>
    </form>
  );
}

Form.propTypes = {
  submitButtonText: PropTypes.string.isRequired,
};

export default Form;
