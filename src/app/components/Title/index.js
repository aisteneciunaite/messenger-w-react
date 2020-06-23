import React from 'react';
import './index.scss';
import PropTypes from 'prop-types';

function Title({ children, level = 1, onClick }) {
  const Tag = level > 6 || level < 1 ? 'h1' : `h${level}`;

  return (
    <Tag className="Title" onClick={onClick}>
      {children}
    </Tag>
  );
}
Title.propTypes = {
  level: PropTypes.oneOf(['1', '2', '3', '4', '5', '6']),
};

export default Title;
