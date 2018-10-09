import React, { Component } from 'react';
import './App.scss';

// Components
import CompletedWords from './components/Text/CompletedWords';
import CurrentWord from './components/Text/CurrentWord';
import FullText from './components/Text/FullText';
import GameDebug from './components/GameDebug';

const text = 'who were now given much greater prominence';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameStatus: 'waiting',
      splitText: text.split(' '),
      input: '',
      correctInputs: {
        completedWords: [],
        currentWord: '',
      },
      currentWordIndex: 0,
      currentIndex: 0,
      stopWatch: {
        timeElapsed: 0,
      },
      stats: {
        wpm: 0,
      },
    };

    this.stopWatch = null;
  }

  componentDidMount() {
    setTimeout(() => {
      this.startTimer();
    }, 2000);
  }

  startTimer = () => {
    this.incrementer = setInterval(
      () => this.setState(prev => ({
        gameStatus: 'playing',
        stopWatch: {
          timeElapsed: prev.stopWatch.timeElapsed + 100,
        },
      })),
      100,
    );
  };

  stopTimer = () => {
    clearInterval(this.incrementer);
    this.setState({
      gameStatus: 'finished',
    });
  };

  handleCorrectInputs = (input) => {
    const { correctInputs } = this.state;
    this.setState(prev => ({
      correctInputs: {
        currentWord: input,
        completedWords: prev.correctInputs.completedWords,
      },
      currentIndex:
        correctInputs.completedWords === undefined || correctInputs.completedWords.length === 0
          ? input.length
          : prev.correctInputs.completedWords.join(' ').length + input.length + 1,
    }));
  };

  nextWord = () => {
    const { correctInputs, splitText, currentWordIndex } = this.state;
    this.setState(
      prev => ({
        input: '',
        correctInputs: {
          currentWord: '',
          completedWords:
            // If there are no completed words add only current word
            // otherwise append current word to previous state
            correctInputs.completedWords === undefined || correctInputs.completedWords.length === 0
              ? [splitText[prev.currentWordIndex]]
              : [...prev.correctInputs.completedWords, splitText[prev.currentWordIndex]],
        },
        currentWordIndex: currentWordIndex + 1,
        currentIndex:
          prev.correctInputs.completedWords.join(' ').length
          + splitText[prev.currentWordIndex].length
          + 1,
      }),
      () => {
        // Calculate stats (WPM) when completedWords state is set
        this.calcStats();
      },
    );
  };

  calcStats = () => {
    const { correctInputs, stopWatch } = this.state;
    this.setState({
      stats: {
        wpm: (correctInputs.completedWords.length / stopWatch.timeElapsed) * 60000,
      },
    });
  };

  handleInput = (e) => {
    const { splitText, currentWordIndex, correctInputs } = this.state;
    const input = e.target.value;

    const currentWord = splitText[currentWordIndex];

    // Set input state
    this.setState({ input });

    // Get substring from current word with the same length as the input
    const subString = splitText[currentWordIndex].substring(0, input.length);

    if (e.target.value.length > 0) {
      // Compare current input with substring
      if (subString === e.target.value) {
        // Add correct inputs to state and set index
        this.handleCorrectInputs(input);
      }
    } else {
      // If nothing is entered, empty states
      this.setState(prev => ({
        correctInputs: {
          currentWord: '',
          completedWords: prev.correctInputs.completedWords,
        },
        currentIndex: prev.correctInputs.completedWords.join(' ').length + input.length + 1,
      }));
    }

    // Handle spaces
    // Check if entered text ends with string
    if (/\s$/.test(input)) {
      /*
        Compare input and whole current word to determine
        if user is ready to move on to the next word
      */
      if (input.substring(0, input.indexOf(' ')) === splitText[currentWordIndex]) {
        // Move to the next word
        this.nextWord();
      } else {
        // Space was entered but input was not correct
      }
    }

    // Handle end string
    if (
      currentWordIndex === splitText.length - 1
      && correctInputs.currentWord.length === currentWord.length - 1
    ) {
      this.setState(
        prev => ({
          input: '',
          correctInputs: {
            completedWords: [
              ...prev.correctInputs.completedWords,
              splitText[prev.currentWordIndex],
            ],
          },
        }),
        () => {
          // Calculate stats (WPM) when completedWords state is set
          this.calcStats();
        },
      );
      this.stopTimer();
    }
  };

  render() {
    const {
      correctInputs, stopWatch, currentIndex, input, gameStatus, stats,
    } = this.state;
    return (
      <div className="App">
        <div className="container">
          <GameDebug parentState={this.state} />
          <h1>{gameStatus}</h1>
          <h3>
            <span>
              Time:
              {Number.parseFloat(stopWatch.timeElapsed / 1000).toFixed(1)}
            </span>
            <br />
            <span>
              WPM:
              {Math.round(stats.wpm)}
            </span>
          </h3>

          <p>
            <CompletedWords words={correctInputs.completedWords} />
            <CurrentWord word={correctInputs.currentWord} />
            <FullText text={text} currentIndex={currentIndex} />
          </p>
          {gameStatus !== 'finished' && (
            <input type="text" value={input} onChange={this.handleInput} />
          )}
        </div>
      </div>
    );
  }
}

export default App;
