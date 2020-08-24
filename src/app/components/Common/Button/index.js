import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Button = React.forwardRef(({ children, className, onClick, to }, ref) => {
  const classes = className ? `${className}` : 'Button';
  const Tag = to ? Link : 'button';

  return (
    <Tag to={to} className={classes} onClick={onClick} ref={ref}>
      {children}
    </Tag>
  );
});

Button.propTypes = {
  onClick: PropTypes.func,
  className: PropTypes.string,
};

export default Button;
