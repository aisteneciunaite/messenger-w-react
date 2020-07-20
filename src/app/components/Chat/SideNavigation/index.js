import './index.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import channels from 'channels';
import contacts from 'contacts';
import auth from 'authentication';
import messages from 'messages';

import plusIcon from 'app/assets/icons/plus.svg';
import Title from 'app/components/Common/Title';

function NavList({ title, isloading, submit, children }) {
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
      <Title level="5">{title}</Title>
      <img src={plusIcon} alt="" className="icon" onClick={toggleForm} />
      {inputVisible && (
        <form onSubmit={handleSubmit}>
          <input type="text" name="" id={title + '-to-add'} ref={input} />
          <button type="submit">+</button>
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
  const dispatch = useDispatch();
  const token = useSelector(auth.selectors.getToken);

  const channelsIsLoading = useSelector(channels.selectors.getIsLoadingChannels);
  const userChannels = useSelector(channels.selectors.getChannels);

  const contactsIsLoading = useSelector(contacts.selectors.getIsLoadingContacts);
  const userContacts = useSelector(contacts.selectors.getContacts);

  useEffect(() => {
    dispatch(channels.actions.fetchUserChannels(token));
    dispatch(contacts.actions.fetchUserContacts(token))
  }, [token, dispatch]);

  const saveChannel = name => {
    dispatch(channels.actions.newChannel({ token, name }));
  };

  const saveContact = email => {
    dispatch(channels.actions.newContact({ token, email }));
  };

  return (
    <aside className="SideNav">
      <NavList title="Kanalai" isloading={channelsIsLoading} submit={saveChannel}>
        {userChannels.map(channel => (
          <li
            key={channel._id}
            onClick={() =>
              dispatch(
                messages.actions.enterChannel({ channelId: channel._id, channelName: channel.name })
              )
            }
          >
            {channel.name}
          </li>
        ))}
      </NavList>
      <NavList title="Kontaktai" isloading={contactsIsLoading} submit={saveContact}>
        {userContacts.map(contact => (
          <li key={contact._id}>{contact.username}</li>
        ))}
      </NavList>
    </aside>
  );
}

export default SideNavigation;
