import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Grid, Icon, Menu } from 'semantic-ui-react';
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
          <Button icon color="blue" circular onClick={() => dispatch(openCreateModal({}))}>
            <Icon name="plus" />
          </Button>
        </Menu.Item>
      </Menu>
      <Grid padded="horizontally" divided="vertically">
        <Grid.Row columns={4} stretched>
          {hotDogsIdsArr.map(id => (
            <Grid.Column key={id}>
              <CardComponent
                id={id}
              />
            </Grid.Column>
          ))}
        </Grid.Row>
      </Grid>
      <ModalWindow />
    </>
  );
};

export default App;
