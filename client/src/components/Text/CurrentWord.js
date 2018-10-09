import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCurrentWord = styled.span`
  color: green;
`;

class CurrentWord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { word } = this.props;
    return <StyledCurrentWord>{word}</StyledCurrentWord>;
  }
}

CurrentWord.propTypes = {
  word: PropTypes.string.isRequired,
};

export default CurrentWord;
