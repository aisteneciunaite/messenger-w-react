import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import messages from '../../../messages';
import auth from '../../../authentication';

import './index.scss';

import Message from '../../components/Message';
import SideNavigation from '../../components/SideNavigation';
import Input from '../../components/Input';
import Button from '../../components/Button';

function Chat({ children }) {
  const dispatch = useDispatch();

  const channelId = useSelector(messages.selectors.getChannelId);
  const token = useSelector(auth.selectors.getToken);
  const chatMessages = useSelector(messages.selectors.getMessages);
  console.log(chatMessages);

  useEffect(() => {
    if (channelId) {
      dispatch(messages.actions.fetchMessages({ token, channelId, skip: 0 }));
    }
  }, [token, dispatch, channelId]);

  return (
    <main className="Chat">
      <SideNavigation />
      <section className="Chat__window">
        <div className="Chat__messages">
          {' '}
          {chatMessages.map(message => (
            <Message
              user={{ name: message.user.username, image: message.user.avatarUrl }}
              timestamp={message.createdAt}
              text={message.text}
              key={message._id}
            />
          ))}
          <Message
            user={{ name: 'Test user 1', image: '' }}
            timestamp="06/22/2020"
            text="sample text"
          />
          <Message
            user={{ name: 'Test user 2', image: '' }}
            timestamp="06/22/2021"
            text="sample text 2"
          />
        </div>

        <form className="Chat__form">
          <Input input={{ type: 'text', id: 'message-input' }}>
            <Button type="submit">{'>'}</Button>
          </Input>
        </form>
      </section>
    </main>
  );
}

export default Chat;
