import React from 'react';
import './index.scss';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: any;
  className?: string;
  onClick?: (e: { preventDefault: () => void }) => void;
  to?: string;
  type?: string;
}

const Button = React.forwardRef(({ children, className, onClick, to, type }: ButtonProps, ref) => {
  const classes = className ? `${className}` : 'Button';
  const Tag: any = to ? Link : 'button';

  return (
    <Tag to={to} className={classes} onClick={onClick} ref={ref} type={type}>
      {children}
    </Tag>
  );
});

export default Button;
