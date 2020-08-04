import React from 'react';
import Default from '../layouts/Default';
import Inbox from '../components/Inbox/Inbox';

const messages = () => {
  return (
    <Default>
      <h3>Messages</h3>
      <Inbox></Inbox>
    </Default>
  )
}

export default messages
