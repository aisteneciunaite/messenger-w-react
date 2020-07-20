import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Button({ children, className, onClick, to }) {
  const classes = className ? `Button ${className}` : 'Button';
  const Tag = to ? Link : 'button';

  return (
    <Tag to={to} className={classes} onClick={onClick}>
      {children}
    </Tag>
  );
}

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
