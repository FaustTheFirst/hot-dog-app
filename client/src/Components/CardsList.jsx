import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'semantic-ui-react';
import CardUnit from '../Containers/CardUnit';
import ErrorHeader from './ErrorHeader';

const CardsList = ({ hotDogsIdsArr }) => (
  <>
    {hotDogsIdsArr.length === 0
      ? <ErrorHeader content="There is no created hotdogs already... So let's create one!" iconName="meh outline" />
      : (
        <Card.Group stackable itemsPerRow={4}>
          {hotDogsIdsArr.map(id => (
            <CardUnit
              id={id}
              key={id}
            />
          ))}
        </Card.Group>
      )}
  </>
);

CardsList.propTypes = {
  hotDogsIdsArr: PropTypes.arrayOf(PropTypes.string)
};

CardsList.defaultProps = {
  hotDogsIdsArr: []
};

export default CardsList;
