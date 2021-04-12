import React from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Image } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getEntityById, openUpdateModal } from '../entity';
/* eslint-disable camelcase */
const CardComponent = ({ id }) => {
  const dispatch = useDispatch();
  const hotDog = useSelector(getEntityById(id));
  const { name, description, price, imgURL, created_at, updated_at } = hotDog;
  const dateCreated = moment(created_at).fromNow();
  const dateUpdated = created_at !== updated_at ? moment(updated_at).fromNow() : null;
  return (
    <Card style={{ wordBreak: 'break-word' }}>
      <Image
        src={imgURL || 'https://react.semantic-ui.com/images/wireframe/image.png'}
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
        onClick={() => dispatch(openUpdateModal({ data: { id, name, price, description, imgURL }, type: 'Update' }))}
        style={{ bottom: '0' }}
      />
    </Card>
  );
};

CardComponent.propTypes = {
  id: PropTypes.string.isRequired
};

export default CardComponent;
