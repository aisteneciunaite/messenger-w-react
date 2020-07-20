import './index.scss';
import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import navLists from '../../../../nav-lists';
import auth from '../../../../authentication';
import messages from '../../../../messages';

import plusIcon from '../../../assets/icons/plus.svg';
import Title from '../../Common/Title';

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

  const channelsIsLoading = useSelector(navLists.selectors.getIsLoadingChannels);
  const channels = useSelector(navLists.selectors.getChannels);

  const contactsIsLoading = useSelector(navLists.selectors.getIsLoadingContacts);
  const contacts = useSelector(navLists.selectors.getContacts);

  useEffect(() => {
    dispatch(navLists.actions.fethChannelsAndContacts(token));
  }, [token, dispatch]);

  const saveChannel = name => {
    dispatch(navLists.actions.newChannel({ token, name }));
  };

  const saveContact = email => {
    dispatch(navLists.actions.newContact({ token, email }));
  };

  return (
    <aside className="SideNav">
      <NavList title="Kanalai" isloading={channelsIsLoading} submit={saveChannel}>
        {channels.map(channel => (
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
        {contacts.map(contact => (
          <li key={contact._id}>{contact.username}</li>
        ))}
      </NavList>
    </aside>
  );
}

export default SideNavigation;
