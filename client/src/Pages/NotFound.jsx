import React from 'react';
import { Link } from 'react-router-dom';
import { Header, Icon } from 'semantic-ui-react';

const NotFound = () => (
  <Header as="h2" icon textAlign="center" style={{ marginTop: 50 }}>
    <Icon name="meh outline" />
    <Header.Content>
      Looks like this page not exists...
      <br />
      {'But you can go to '}
      <Link to="/">Home</Link>
      {' page!'}
    </Header.Content>
  </Header>
);

export default NotFound;
