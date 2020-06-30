import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { socket } from '../../state/middleware/socket';

import messages from '../../../messages';
import auth from '../../../authentication';

import './index.scss';

import Message from '../../components/Message';
import SideNavigation from '../../components/SideNavigation';
import Input from '../../components/Input';
import Button from '../../components/Button';

function Chat({ children }) {
  const dispatch = useDispatch();
  const messageInput = useRef(null);
  const channelId = useSelector(messages.selectors.getChannelId);
  const token = useSelector(auth.selectors.getToken);
  const chatMessages = useSelector(messages.selectors.getMessages);

  useEffect(() => {
    socket.on('new message', message => {
      dispatch(messages.actions.recieveMessage(message));
    });
  }, [dispatch]);

  //enter channel from local storage if state does not have one
  useEffect(() => {
    if (!channelId) {
      dispatch(messages.actions.enterChannel(JSON.parse(localStorage.getItem('app-channel'))));
    }
  }, [dispatch, channelId]);

  //get channel messages from server
  useEffect(() => {
    if (channelId) {
      dispatch(messages.actions.fetchMessages({ token, channelId, skip: 0 }));
    }
  }, [token, dispatch, channelId]);

  const sendMessage = e => {
    e.preventDefault();
    dispatch(messages.actions.sendMessage({ token, channelId, text: messageInput.current.value }));
  };

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
        </div>

        <form className="Chat__form" onSubmit={sendMessage}>
          <Input input={{ type: 'text', id: 'message-input', ref: messageInput }}>
            <Button type="submit">{'>'}</Button>
          </Input>
        </form>
      </section>
    </main>
  );
}

export default Chat;
