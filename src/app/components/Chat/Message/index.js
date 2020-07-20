import React, { useRef, useEffect } from 'react';
import avatar from 'app/assets/images/avatar.png';
import './index.scss';

function Message({ user, timestamp, text }) {
  const container = useRef(null);
  useEffect(() => {
    // console.dir(container.current.clientHeight)
  })

  return (
    <div className="Message" ref={container}>
      <div className="Message__image">
        <img src={avatar} alt="user profile" />
      </div>
      <div className="Message__textbox">
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
