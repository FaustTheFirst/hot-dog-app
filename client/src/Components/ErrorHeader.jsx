import React from 'react';
import PropTypes from 'prop-types';
import { Header, Icon } from 'semantic-ui-react';

const ErrorHeader = ({ content, iconName }) => (
  <Header as="h2" icon textAlign="center">
    <Icon name={iconName} />
    <Header.Content>
      {content}
    </Header.Content>
  </Header>
);

ErrorHeader.propTypes = {
  content: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired
};

export default ErrorHeader;
