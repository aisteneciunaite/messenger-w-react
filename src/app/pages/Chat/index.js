import React, { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { socket } from 'app/state/middleware/socket';

import messages from 'messages';
import channels from 'channels';
import auth from 'authentication';

import './index.scss';

import Message from 'app/components/Chat/Message';
import SideNavigation from 'app/components/Chat/SideNavigation';
import Input from 'app/components/Common/Input';
import Button from 'app/components/Common/Button';
import ChannelTools from 'app/components/Chat/ChannelTools';

function Chat() {
  const dispatch = useDispatch();
  const messageInput = useRef(null);
  const channelId = useSelector(channels.selectors.getOpenChannelId);
  const channelName = useSelector(channels.selectors.getOpenChannelName);
  const token = useSelector(auth.selectors.getToken);
  const chatMessages = useSelector(messages.selectors.getMessages);

  const containerMessages = useRef(null);

  // listen for new message
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
      dispatch(channels.actions.openChannel({ ...localChannel, token }));
    }
  }, [dispatch, channelId, token]);

  //get channel messages from server
  const getMessages = useCallback(async () => {
    if (channelId) {
      await dispatch(messages.actions.fetchMessages({ token, channelId, skip: 0 }));
      containerMessages.current.scrollTop = containerMessages.current.scrollHeight;
    }
  }, [token, dispatch, channelId]);
  useEffect(() => {
    getMessages();
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
        <div className="">
          <div className="Chat__messages Chat__scrollbar" ref={containerMessages}>
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
        </div>

        <form className="Chat__form" onSubmit={sendMessage}>
          <Input input={{ type: 'text', id: 'message-input', ref: messageInput }}>
            <Button type="submit">{'>'}</Button>
          </Input>
        </form>
      </section>
      <ChannelTools channelId={channelId} channelName={channelName} />
    </main>
  );
}

export default Chat;
