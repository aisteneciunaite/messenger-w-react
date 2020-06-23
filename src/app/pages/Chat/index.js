import React from 'react';
import './index.scss';

import Message from '../../components/Message';
import SideNavigation from '../../components/SideNavigation';

function Chat({ children }) {
  return (
    <main className="Chat">
      <SideNavigation />
      <section>
        {' '}
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
      </section>
    </main>
  );
}

export default Chat;
