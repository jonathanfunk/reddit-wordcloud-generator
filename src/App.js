import React, { Component } from 'react';
import './App.css';
import words from './words';
import ReactWordcloud from 'react-wordcloud';

class App extends Component {
  state = {
    words: words
  };

  render() {
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

    return (
      <div className="app">
        <header className="app-header">
          <h1>Subreddit Wordcloud Generator</h1>
          <p className="subtitle">
            Upload your favourite subreddit and get a visual of the most
            commonly used words
          </p>
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
