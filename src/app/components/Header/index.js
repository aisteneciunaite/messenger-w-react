import React from 'react';
// import { Link } from 'react-router-dom';
import './index.scss';
import logo from '../../assets/images/lotus-flower-1805784_640-min.png';

// modules

function Header() {
  return (
    <header className="Header">
      <img src={logo} alt="logo" className="Header__Logo" />
    </header>
  );
}

export default Header;
