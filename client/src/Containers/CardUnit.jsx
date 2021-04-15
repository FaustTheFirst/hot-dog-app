import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { openModal } from '../state/slice';
import { getEntityById } from '../state/selectors';
import placeholder from '../assets/placeholder.png';

/* eslint-disable camelcase */
const CardUnit = ({ id }) => {
  const dispatch = useDispatch();
  const hotDog = useSelector(getEntityById(id));
  const { name, description, price, imgURL, createdAt, updatedAt } = hotDog;
  const dateCreated = moment(createdAt).fromNow();
  const dateUpdated = createdAt !== updatedAt ? moment(updatedAt).fromNow() : null;
  return (
    <Card style={{ wordBreak: 'break-word' }}>
      <Image
        src={imgURL || placeholder}
        alt={name}
      />
      <Card.Content>
        <Card.Header>
          {name}
        </Card.Header>
        <Card.Meta>
          {`Created - ${dateCreated}`}
          <br />
          {dateUpdated ? ` (last update - ${dateUpdated})` : null}
        </Card.Meta>
        <Card.Description>
          {`${price}$`}
        </Card.Description>
        <Card.Content extra>
          {description || 'No description provided'}
        </Card.Content>
      </Card.Content>
      <Button
        color="blue"
        content="edit"
        attached="bottom"
        onClick={() => dispatch(openModal({ data: { id, name, price, description, imgURL }, type: 'Update' }))}
        style={{ bottom: '0' }}
      />
    </Card>
  );
};

CardUnit.propTypes = {
  id: PropTypes.string.isRequired
};

export default CardUnit;
