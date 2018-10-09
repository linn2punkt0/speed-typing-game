import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCompletedWords = styled.span`
  color: green;
  text-decoration: underline;
`;

class CurrentWord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { words } = this.props;
    return (
      <StyledCompletedWords>
        {words.join(' ')}
        {' '}
      </StyledCompletedWords>
    );
  }
}

CurrentWord.propTypes = {
  words: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default CurrentWord;
