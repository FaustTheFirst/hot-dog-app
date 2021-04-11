import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Icon, Menu } from 'semantic-ui-react';
import { selectIds, openCreateModal } from '../entity';
import { getAllHotDogs } from '../thunks';
import ModalWindow from '../Components/ModalWindow';
import CardComponent from '../Components/CardComponent';

const App = () => {
  const dispatch = useDispatch();
  const hotDogsIdsArr = useSelector(selectIds);

  useEffect(() => dispatch(getAllHotDogs()), []);

  return (
    <>
      <Menu>
        <Menu.Item position="left">
          Icon
        </Menu.Item>
        <Menu.Item position="right">
          <Button icon circular onClick={() => dispatch(openCreateModal({}))}>
            <Icon name="plus" />
          </Button>
        </Menu.Item>
      </Menu>
      {hotDogsIdsArr.map(id => (
        <CardComponent
          key={id}
          id={id}
        />
      ))}
      <ModalWindow />
    </>
  );
};

export default App;
