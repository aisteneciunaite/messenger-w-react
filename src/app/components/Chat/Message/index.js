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
        <p className="Message__details">
          <b className="Message__details Message__details--name">{user.name}</b>
          <i className="Message__details Message__details--date">{dateString}</i>
        </p>
        <p className="Message__content">{text}</p>
      </div>
    </div>
  );
}

export default Message;
