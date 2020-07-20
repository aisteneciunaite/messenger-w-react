import React, { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { socket } from '../../state/middleware/socket';

import messages from '../../../messages';
import auth from '../../../authentication';

import './index.scss';

// import Message from '../../components/Chat/Message';

import Message from '../../components/Chat/Message';
import SideNavigation from '../../components/Chat/SideNavigation';
import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';

function Chat({ children }) {
  const dispatch = useDispatch();
  const messageInput = useRef(null);
  const channelId = useSelector(messages.selectors.getChannelId);
  const token = useSelector(auth.selectors.getToken);
  const chatMessages = useSelector(messages.selectors.getMessages);

  const chatWinndow = useRef(null);
  const chatForm = useRef(null);
  const chatArea = useRef(null);

  useLayoutEffect(() => {
    const element = document.querySelector('.Chat__messages');
    // console.log(chatForm.current.clientHieght)
    // element && element.styles.setProperty('')
    console.dir(element);
  }, []);

  useEffect(() => {
    socket.on('new message', message => {
      dispatch(messages.actions.recieveMessage(message));
    });
  }, [dispatch]);

  //enter channel from local storage if state does not have one
  useEffect(() => {
    let localChannel = JSON.parse(localStorage.getItem('app-channel'));
    if (!channelId && localChannel) {
      dispatch(messages.actions.enterChannel(localChannel));
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
    e.target.reset();
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

        <form className="Chat__form" onSubmit={sendMessage} ref={chatForm}>
          <Input input={{ type: 'text', id: 'message-input', ref: messageInput }}>
            <Button type="submit">{'>'}</Button>
          </Input>
        </form>
      </section>
    </main>
  );
}

export default Chat;
