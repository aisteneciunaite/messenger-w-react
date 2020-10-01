import './index.scss';
import logo from 'app/assets/images/lotus-flower-1805784_640-min.png';
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import auth from 'store/authentication';
import channels from 'store/channels';
import layout from 'app/state/layout';

import Button from '../Button';

import infoIcon from 'app/assets/icons/info.svg';
import iconMenuOpen from 'app/assets/icons/open-menu.svg';
import iconMenuClose from 'app/assets/icons/close.svg';

//local component
function BurgerMenu() {
  const dispatch = useDispatch();
  const isClosed = useSelector(layout.selectors.isBurgerMenuHidden);
  const handleClick = () => {
    dispatch(layout.actions.toggleBurgerMenu(isClosed));
  };

  return (
    <button type="button" className="BurgerMenu" onClick={handleClick}>
      {isClosed ? <img src={iconMenuOpen} alt="menu" /> : <img src={iconMenuClose} alt="menu" />}
    </button>
  );
}

// local component
function TopMenu({ userName, channelName, token, userImage }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const isChannelToolsOpen = useSelector(channels.selectors.getChannelToolsOpenState);

  const dispatch = useDispatch();
  function handleClick(e) {
    e.preventDefault();
    dispatch(auth.actions.logout(token));
  }

  const toggleDropdown = () => {
    setDropdownOpen(prevState => !prevState);
  };

  const handleChannelClick = () => {
    dispatch(channels.actions.toggleChannelTools(isChannelToolsOpen));
  };

  return (
    <>
      <nav className="TopMenu">
        <div className="dropdown">
          <button className="Button--clear flex-center" type="button" onClick={toggleDropdown}>
            <span
              className="userName"
              id="userName"
              data-toggle="modal"
              data-target="#userInfoModal"
            >
              {userName}
            </span>
            <img src={userImage} alt="user" />
          </button>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <Button className="Button dropdown-item disabled" aria-disabled="true">
                Keisti slaptažodį
              </Button>
              <Button className="Button dropdown-item" onClick={handleClick}>
                Atsijungti
              </Button>
            </div>
          )}
        </div>
        {channelName && (
          <>
            <div className="divider-horizontal"></div>

            <button className="Button--clear flex-center" onClick={handleChannelClick}>
              <span id="channelName">{channelName}</span>
              <img src={infoIcon} alt="channel info" />
            </button>
          </>
        )}
      </nav>
    </>
  );
}
// main component
function Header() {
  const channelName = useSelector(channels.selectors.getOpenChannelName);

  const token = useSelector(auth.selectors.getToken);
  const authenticated = !!token;
  const userName = useSelector(auth.selectors.getUserName);
  const userImage = useSelector(auth.selectors.getUserImage);

  return (
    <header className="Header">
      <div>
        <img src={logo} alt="logo" className="Header__Logo" />
        {authenticated && <BurgerMenu />}
      </div>

      <div>
        {authenticated ? (
          <TopMenu
            userName={userName}
            userImage={userImage}
            channelName={channelName}
            token={token}
          />
        ) : (
          <>
            <Button to="/register">Registruotis</Button>
            <Button to="/login">Prisijungti</Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
