import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Message, TransitionablePortal } from 'semantic-ui-react';
import { dissmissMessage, getMessage, getStatus } from '../entity';

const Notification = () => {
  const dispatch = useDispatch();
  const status = useSelector(getStatus());
  const message = useSelector(getMessage());
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(status === 'error' || status === 'success'), [status]);

  return (
    <TransitionablePortal
      transition={{ animation: 'fade left', duration: 500 }}
      open={isOpen}
      onClose={() => dispatch(dissmissMessage())}
    >
      <Message
        success={status === 'success'}
        error={status === 'error'}
        header={status}
        content={message}
        onDismiss={() => setIsOpen(false)}
        style={{ bottom: '10%', position: 'fixed', right: '10%', zIndex: 1000 }}
      />
    </TransitionablePortal>
  );
};

export default Notification;
