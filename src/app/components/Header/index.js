import './index.scss';
import logo from '../../assets/images/lotus-flower-1805784_640-min.png';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import auth from '../../../authentication';

import Button from '../Button';

// modules

function Header() {
  const dispatch = useDispatch();
  const token = useSelector(auth.selectors.getToken);
  // const userDetails = useSelector(auth.selectors.getUserDetails);
  const authenticated = !!token;

  function handleClick(e) {
    e.preventDefault();
    dispatch(auth.actions.logout(token));
  }

  return (
    <header className="Header">
      <img src={logo} alt="logo" className="Header__Logo" />
      <div>
        {authenticated ? (
          <>
            {/* <span>{userDetails.name}</span> */}
            <Button onClick={handleClick}>Sign out</Button>
          </>
        ) : (
          <>
            <Button to="/register">Register</Button>
            <Button to="/login">Log in</Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
