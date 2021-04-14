import React from 'react';
import PropTypes from 'prop-types';
import CardsList from './CardsList';
import ErrorHeader from './ErrorHeader';

const LoadedContent = ({ showList, hotDogsIdsArr }) => (
  <>
    {showList
      ? <CardsList hotDogsIdsArr={hotDogsIdsArr} />
      : (
        <ErrorHeader
          content="Failed to load data. Please refresh the page or try again later"
          iconName="frown outline"
        />
      )}
  </>
);

LoadedContent.propTypes = {
  showList: PropTypes.bool.isRequired,
  hotDogsIdsArr: PropTypes.arrayOf(PropTypes.string)
};

LoadedContent.defaultProps = {
  hotDogsIdsArr: []
};

export default LoadedContent;
