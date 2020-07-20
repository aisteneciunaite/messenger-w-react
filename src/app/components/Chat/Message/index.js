import React from 'react';
import avatar from 'app/assets/images/avatar.png';
import './index.scss';

function Message({ user, timestamp, text }) {
  const date = new Date(timestamp);
  const dateString = date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  return (
    <div className="Message">
      <div className="Message__image">
        <img src={avatar} alt="user profile" />
      </div>
      <div className="Message__textbox">
        <p>
          <b>{user.name}</b>
          <i>{dateString}</i>
        </p>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default Message;
