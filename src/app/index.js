import React from 'react';
// import socketIOClient from 'socket.io-client';
// const ENDPOINT = 'http://127.0.0.1:4000';

import './index.scss';

import PageLayout from './components/PageLayout';
import Message from './components/Message';
import Chat from './pages/Chat';

function App() {
  // const [response, setResponse] = useState('');

  // useEffect(() => {
  //   const socket = socketIOClient(ENDPOINT);
  //   socket.on('FromAPI', data => {
  //     setResponse(data);
  //   });
  // CLEAN UP THE EFFECT
  // return () => socket.disconnect()
  // }, []);
  return (
    <PageLayout>
      <p>hello here</p>
      <Chat>
        <Message
          user={{ name: 'Test user 1', image: '' }}
          timestamp="06/22/2020"
          text="sample text"
        />
      </Chat>
    </PageLayout>
  );
}

export default App;
