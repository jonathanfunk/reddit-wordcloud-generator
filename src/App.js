import React, { Component } from 'react';
import './App.css';
import ReactWordcloud from 'react-wordcloud';
import words from './words';

const options = {
  colors: ['#1A202C', '#2D3748', '#4A5568', '#718096', '#A0AEC0'],
  enableTooltip: true,
  deterministic: false,
  fontFamily: 'oswald',
  fontSizes: [24, 96],
  fontStyle: 'normal',
  fontWeight: 'normal',
  padding: 1,
  rotations: 2,
  rotationAngles: [0, 90],
  scale: 'linear',
  spiral: 'rectangular',
  transitionDuration: 1000
};

class App extends Component {
  state = {
    words: words,
    subreddit: '',
    working: false
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      subreddit: e.target.value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    console.log(this.state.subreddit);
    this.setState({
      working: false
    });
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>Subreddit Wordcloud Generator</h1>
          <p className="subtitle">
            Upload your favourite subreddit and get a visual of the most
            commonly used words
          </p>
          <form className="subreddit-input" onSubmit={this.onSubmit}>
            <input
              type="text"
              name="subreddit"
              value={this.state.subreddit}
              onChange={this.onChange}
            />
            <button type="submit">Generate Wordcloud</button>
          </form>
        </header>
        <section className="app-section">
          <div className="container">
            <ReactWordcloud options={options} words={this.state.words} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
