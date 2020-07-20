import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { socket } from 'app/state/middleware/socket';

import messages from 'messages';
import auth from 'authentication';

import './index.scss';

// import Message from '../../components/Chat/Message';

import Message from 'app/components/Chat/Message';
import SideNavigation from 'app/components/Chat/SideNavigation';
import Input from 'app/components/Common/Input';
import Button from 'app/components/Common/Button';

function Chat({ children }) {
  const dispatch = useDispatch();
  const messageInput = useRef(null);
  const channelId = useSelector(messages.selectors.getChannelId);
  const token = useSelector(auth.selectors.getToken);
  const chatMessages = useSelector(messages.selectors.getMessages);
  // console.log(chatMessages)

  const containerMessages = useRef(null)

  // listen for new messages
  useEffect(() => {
    socket.on('new message', message => {
      dispatch(messages.actions.recieveMessage(message));
      containerMessages.current.scrollTop = containerMessages.current.scrollHeight;
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
  const getMessages = useCallback(async () => {
    if (channelId) {
      await dispatch(messages.actions.fetchMessages({ token, channelId, skip: 0 }));
      containerMessages.current.scrollTop = containerMessages.current.scrollHeight
    }
  },
    [token, dispatch, channelId])
  useEffect(() => {
    getMessages()
  }, [getMessages]);


  //send new message
  const sendMessage = e => {
    e.preventDefault();
    dispatch(messages.actions.sendMessage({ token, channelId, text: messageInput.current.value }));
    e.target.reset();
    containerMessages.current.scrollTop = containerMessages.current.scrollHeight;

  };

  return (
    <main className="Chat">
      <SideNavigation />
      <section className="Chat__window">
        <div className="Chat__messages" ref={containerMessages}>
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
