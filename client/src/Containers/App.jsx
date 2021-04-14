import React, { useEffect, useState } from 'react';
import { isFulfilled } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Icon, Image, Loader, Menu } from 'semantic-ui-react';
import { openModal } from '../state/slice';
import { getStatus, selectIds } from '../state/selectors';
import { getAllHotDogs } from '../state/thunks';
import ModalWindow from './ModalWindow';
import Notification from './Notification';
import LoadedContent from '../Components/LoadedContent';
import logo from '../assets/logo.png';

const App = () => {
  const dispatch = useDispatch();
  const hotDogsIdsArr = useSelector(selectIds);
  const status = useSelector(getStatus());
  const [showList, setShowList] = useState(false);

  useEffect(() => dispatch(getAllHotDogs())
    .then(res => setShowList(isFulfilled(res))), []);
  return (
    <>
      <Menu borderless widths={3}>
        <Menu.Item position="left" style={{ justifyContent: 'flex-start' }}>
          <Link to="/" onClick={() => window.location.reload()} style={{ marginLeft: '2%' }}>
            <Image
              avatar
              src={logo}
              alt="logo"
            />
            Hot dog app
          </Link>
        </Menu.Item>
        <Menu.Item header as="h3" content="Hotdogs for everyone!" />
        <Menu.Item position="right" style={{ justifyContent: 'flex-end' }}>
          <Button
            icon
            color="blue"
            circular
            onClick={() => dispatch(openModal({}))}
            style={{ marginRight: '2%' }}
          >
            <Icon name="plus" />
          </Button>
        </Menu.Item>
      </Menu>
      {status === 'loadingAll'
        ? <Loader active content="Loading" />
        : <LoadedContent showList={showList} hotDogsIdsArr={hotDogsIdsArr} />}
      <ModalWindow />
      <Notification />
    </>
  );
};

export default App;
