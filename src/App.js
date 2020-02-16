import React, { Component } from 'react';
import './App.css';
import ReactWordcloud from 'react-wordcloud';
import axios from 'axios';
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

  onSubmit = async e => {
    e.preventDefault();
    try {
      const subredditPosts = await axios.get(
        `https://www.reddit.com/r/${this.state.subreddit}.json`
      );
      console.log(subredditPosts);
    } catch (err) {
      console.log(err);
    }
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
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              name="subreddit"
              value={this.state.subreddit}
              onChange={this.onChange}
              placeholder="Example: webdev"
              className="subreddit-input"
            />
            <button className="submit-button" type="submit">
              Generate Wordcloud
            </button>
          </form>
        </header>
        <section className="app-section">
          <div className="container">
            {/* <ReactWordcloud options={options} words={this.state.words} /> */}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
