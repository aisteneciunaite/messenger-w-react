import React from 'react';
import avatar from '../../assets/images/avatar.png';
import './index.scss';

function Message({ user, timestamp, text }) {
  return (
    <div className="Message">
      <img src={user.image || avatar} alt="user profile" />
      <div>
        <p>
          <b>{user.name}</b>
          <i>{timestamp}</i>
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
