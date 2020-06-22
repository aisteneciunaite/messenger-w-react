import React from 'react';
import './index.scss';

import SideNavigation from '../../components/SideNavigation';

function Chat({ children }) {
  return (
    <main className="Chat">
      <SideNavigation />
      <section>{children}</section>
    </main>
  );
}

export default Chat;
