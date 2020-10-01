import React, { useEffect, useRef, useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { socket } from 'app/state/middleware/socket';
import './index.scss';

//modules
import messages from 'store/messages';
import channels from 'store/channels';
import auth from 'store/authentication';

//components
import Message from 'app/components/Chat/Message';
import SideNavigation from 'app/components/Chat/SideNavigation';
// import Input from 'app/components/Common/Input';
import Input from 'app/components/Common/Input';

import Button from 'app/components/Common/Button';
import ChannelTools from 'app/components/Chat/ChannelTools';

//icons
import iconSend from 'app/assets/icons/send.svg';

function WelcomeMessage() {
  return (
    <div className="WelcomeMessage">
      <h1>Labas!</h1>
      <p>Malonu tave matyti</p>
    </div>
  );
}

function Chat() {
  const dispatch = useDispatch();
  const channelId = useSelector(channels.selectors.getOpenChannelId);
  const channelName = useSelector(channels.selectors.getOpenChannelName);
  const token = useSelector(auth.selectors.getToken);
  const chatMessages = useSelector(messages.selectors.getMessages);
  const isChannelToolsOpen = useSelector(channels.selectors.getChannelToolsOpenState);

  const containerMessages = useRef(null);

  const [messageValue, setMessageValue] = useState('');

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
      containerMessages.current &&
        (containerMessages.current.scrollTop = containerMessages.current.scrollHeight);
    }
  }, [token, dispatch, channelId]);
  useEffect(() => {
    getMessages();
  }, [getMessages]);

  //send new message
  const sendMessage = e => {
    e.preventDefault();
    dispatch(messages.actions.sendMessage({ token, channelId, text: messageValue }));
    e.target.reset();
    containerMessages.current &&
      (containerMessages.current.scrollTop = containerMessages.current.scrollHeight);
  };

  return (
    <main className="Chat">
      <SideNavigation />
      {!channelName ? (
        <WelcomeMessage />
      ) : (
        <>
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
              <Input
                value={messageValue}
                // setValue={setMessageValue}
                domProps={{
                  type: 'text',
                  id: 'message-input',
                  onChange: e => setMessageValue(e.target.value),
                }}
              />
              <Button type="submit" className="Button Chat__form__button">
                <img src={iconSend} alt="send" />
              </Button>
            </form>
          </section>
          {isChannelToolsOpen && <ChannelTools channelId={channelId} channelName={channelName} />}
        </>
      )}
    </main>
  );
}

export default Chat;
