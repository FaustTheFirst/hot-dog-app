import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Card, Icon, Image, Menu } from 'semantic-ui-react';
import { selectIds, openModal } from '../entity';
import { getAllHotDogs } from '../thunks';
import ModalWindow from '../Components/ModalWindow';
import CardComponent from '../Components/CardComponent';
import Notification from '../Components/Notification';

const App = () => {
  const dispatch = useDispatch();
  const hotDogsIdsArr = useSelector(selectIds);

  useEffect(() => dispatch(getAllHotDogs()), []);

  return (
    <>
      <Menu borderless widths={3}>
        <Menu.Item position="left" style={{ justifyContent: 'flex-start' }}>
          <Link to="/" onClick={() => window.location.reload()} style={{ marginLeft: '2%' }}>
            <Image
              avatar
              src="https://st2.depositphotos.com/3259223/5925/v/600/depositphotos_59252767-stock-illustration-hot-dog.jpg"
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
      <Card.Group stackable itemsPerRow={4}>
        {hotDogsIdsArr.map(id => (
          <CardComponent
            id={id}
            key={id}
          />
        ))}
      </Card.Group>
      <ModalWindow />
      <Notification />
    </>
  );
};

export default App;
