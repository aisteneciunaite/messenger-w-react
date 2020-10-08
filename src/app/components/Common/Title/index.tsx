import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

interface TitlePropsObj {
  children: any;
  level: 1 | 2 | 3 | 4 | 5 | 6;
  onClick?: () => void;
  className: string;
}

function Title({ children, level = 1, onClick, className }: TitlePropsObj) {
  const Tag: any = level > 6 || level < 1 ? 'h1' : `h${level}`;
  const classList = className ? `Title ${className}` : 'Title';

  return (
    <Tag className={classList} onClick={onClick}>
      {children}
    </Tag>
  );
}
Title.propTypes = {
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
};

export default Title;
