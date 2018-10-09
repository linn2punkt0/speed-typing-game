import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledFullText = styled.span``;

class CurrentWord extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { text, currentIndex } = this.props;
    return <StyledFullText>{text.substring(currentIndex, text.length)}</StyledFullText>;
  }
}

CurrentWord.propTypes = {
  text: PropTypes.string.isRequired,
  currentIndex: PropTypes.number.isRequired,
};

export default CurrentWord;
