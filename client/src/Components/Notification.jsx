import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message, TransitionablePortal } from 'semantic-ui-react';
import { dissmissMessage, getStatus } from '../entity';

const Notification = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus());

  return (
    <TransitionablePortal
      transition={{ animation: 'fade left', duration: 500 }}
      open={status === 'error' || status === 'success'}
      onClose={() => dispatch(dissmissMessage())}
    >
      <Message
        success={status === 'success'}
        error={status === 'error'}
        content="Sample message"
        style={{ bottom: '10%', position: 'fixed', right: '10%', zIndex: 1000 }}
      />
    </TransitionablePortal>
  );
};

export default Notification;
