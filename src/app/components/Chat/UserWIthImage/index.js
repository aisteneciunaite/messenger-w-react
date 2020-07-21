import React from 'react';
import './index.scss';

function UserListWithImages({ user, tag, className }) {
  const Tag = tag || 'li';
  const classList = className ? `${className} UserWithImage` : 'UserWithImage';

  return (
    <Tag className={classList}>
      <img src={user.avatarUrl} alt="user" />
      <span>{user.username}</span>
    </Tag>
  );
}

export default UserListWithImages;
