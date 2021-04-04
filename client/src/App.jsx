import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'semantic-ui-react';
import Sample from './Components/Sample';
import { fetchTest, select } from './entity';

/* eslint-disable camelcase */
const App = () => {
  const dispatch = useDispatch();
  const allTest = useSelector(select.selectAll);

  return (
    <>
      <Button onClick={() => dispatch(fetchTest())}>
        Test me
      </Button>
      {allTest.map(({ id, name, created_at }) => (
        <Sample
          key={id}
          id={id}
          name={name}
          createdAt={created_at}
        />
      ))}
    </>
  );
};

export default App;
