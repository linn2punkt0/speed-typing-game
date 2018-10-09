import React from 'react';
import PropTypes from 'prop-types';

const GameDebug = ({
  parentState: {
    correctInputs,
    currentWordIndex,
    splitText,
    currentIndex,
    // input,
    stopWatch,
    stats,
  },
}) => (
  <div>
    <small>
      <span>
        Stopwatch:
        {Number.parseFloat(stopWatch.timeElapsed / 1000).toFixed(1)}
      </span>
      <br />
      <span>
        WPM:
        {Math.round(stats.wpm)}
      </span>
      <br />
      <span>
        Current Index:
        {currentIndex}
      </span>
      <br />
      <span>
        Completed Words:
        {correctInputs.completedWords.join(' ')}
      </span>
      <br />
      <span>
        Correct Input (Current Word):
        {correctInputs.currentWord}
      </span>
      <br />
      <span>
        Current Word:
        {' '}
        {splitText[currentWordIndex]}
        {' '}
[
        {currentWordIndex}
]
      </span>
      <br />
    </small>
  </div>
);

GameDebug.propTypes = {
  parentState: PropTypes.shape({
    correctInputs: PropTypes.shape({}),
    currentWordIndex: PropTypes.number,
    splitText: PropTypes.arrayOf(PropTypes.string),
    currentIndex: PropTypes.number,
    input: PropTypes.string,
    stopWatch: PropTypes.shape({}),
    stats: PropTypes.shape({}),
  }).isRequired,
};

export default GameDebug;
