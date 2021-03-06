import './index.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import channels from 'store/channels';
import contacts from 'store/contacts';
import auth from 'store/authentication';
import layout from 'app/state/layout';

import plusIcon from 'app/assets/icons/plus.svg';
import Title from 'app/components/Common/Title';
import Button from 'app/components/Common/Button';

function NavList({ title, isloading, submit, children, placeholder }) {
  const [inputVisible, setInputVisible] = useState(false);
  const input = useRef();

  const handleSubmit = e => {
    e.preventDefault();
    input.current.value.length && submit(input.current.value);
    toggleForm();
  };

  const toggleForm = () => setInputVisible(prevState => !prevState);

  return (
    <>
      <div className="SideNav__heading">
        <Title level="3" className="SideNav__title">
          {title}
        </Title>
        <button className="Button--clear" onClick={toggleForm}>
          <img src={plusIcon} alt="" className="icon" />
        </button>
      </div>

      {inputVisible && (
        <form onSubmit={handleSubmit} className="SideNav__form">
          <input type="text" placeholder={placeholder} name="" id={title + '-to-add'} ref={input} />
          <Button type="submit" className="Button SideNav__button">
            +
          </Button>
        </form>
      )}
      {isloading ? (
        <span>Loading</span>
      ) : (
        <nav>
          <ul>{children}</ul>
        </nav>
      )}
    </>
  );
}

function SideNavigation() {
  const isHidden = useSelector(layout.selectors.isBurgerMenuHidden);

  const dispatch = useDispatch();
  const token = useSelector(auth.selectors.getToken);

  const channelsIsLoading = useSelector(channels.selectors.getIsLoadingChannels);
  const userChannels = useSelector(channels.selectors.getChannels);

  const contactsIsLoading = useSelector(contacts.selectors.getIsLoadingContacts);
  const userContacts = useSelector(contacts.selectors.getContacts);

  useEffect(() => {
    dispatch(channels.actions.fetchUserChannels(token));
    dispatch(contacts.actions.fetchUserContacts(token));
  }, [token, dispatch]);

  const saveChannel = name => {
    dispatch(channels.actions.newChannel({ token, name }));
  };

  const saveContact = email => {
    dispatch(contacts.actions.newContact({ token, email }));
  };

  const classList = isHidden ? 'SideNav SideNav--hidden' : 'SideNav';

  return (
    <aside className={classList}>
      <NavList
        title="Kanalai"
        placeholder="Kanalo pavadinimas"
        isloading={channelsIsLoading}
        submit={saveChannel}
      >
        {userChannels.map(userChannel => (
          <li key={userChannel._id}>
            <button
              className="SideNav__Button--clear"
              onClick={() =>
                dispatch(
                  channels.actions.openChannel({
                    channelId: userChannel._id,
                    channelName: userChannel.name,
                    token,
                  })
                )
              }
            >
              {userChannel.name}
            </button>
          </li>
        ))}
      </NavList>
      <NavList
        title="Kontaktai"
        placeholder="Elektrononis paštas"
        isloading={contactsIsLoading}
        submit={saveContact}
      >
        {userContacts.map(contact => (
          <li key={contact._id}>
            <button className="SideNav__Button--clear">{contact.username}</button>
          </li>
        ))}
      </NavList>
    </aside>
  );
}

export default SideNavigation;
