import './index.scss';
import logo from 'app/assets/images/lotus-flower-1805784_640-min.png';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import auth from 'authentication';
import channels from 'channels';

import Button from '../Button';

import infoIcon from 'app/assets/icons/info.svg';

// modules
function TopMenu({ userName, channelName, token }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(auth.actions.logout(token));
  }

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  return (
    <>
      <nav className="TopMenu">
        <div className="dropdown">
          <div className="flex-center" type="button" onClick={toggleDropdown}>
            <span
              className="userName"
              id="userName"
              data-toggle="modal"
              data-target="#userInfoModal"
            >
              {userName}
            </span>
            <img
              src="https://pngimage.net/wp-content/uploads/2018/06/no-user-image-png-200x200.png"
              alt="user"
            />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Button className="dropdown-item disabled" aria-disabled="true">
                Keisti slaptažodį
              </Button>
              <Button className="dropdown-item" onClick={handleClick}>
                Atsijungti
              </Button>
            </div>
          )}
        </div>

        <div className="divider-horizontal"></div>

        <div className="flex-center">
          <span id="channelName">{channelName}</span>
          <img src={infoIcon} alt="channel info" />
        </div>
      </nav>
    </>
  );
}

function Header() {
  const channelName = useSelector(channels.selectors.getOpenChannelName);
  const token = useSelector(auth.selectors.getToken);
  const authenticated = !!token;
  const userName = useSelector(auth.selectors.getUserName);

  return (
    <header className="Header">
      <img src={logo} alt="logo" className="Header__Logo" />
      <div>
        {authenticated ? (
          <TopMenu userName={userName} channelName={channelName} token={token} />
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
