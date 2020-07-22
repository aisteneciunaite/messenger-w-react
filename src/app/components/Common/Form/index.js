import './index.scss';

import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

function Form(props) {
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
