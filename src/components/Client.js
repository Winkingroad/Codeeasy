import React from 'react';
import Avatar from 'react-avatar';

const Client = ({ username }) => {
  return (
    <div className='client flex items-center space-x-2  p-4'>
      <Avatar name={username} size={50} round="14px" />
      <span className="text-white">{username}</span>
    </div>
  );
};

export default Client;
