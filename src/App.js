import React, { Component } from 'react';
import './App.css';
import words from './words';
import ReactWordcloud from 'react-wordcloud';

class App extends Component {
  state = {
    words: words
  };

  render() {
    console.log(this.state.words);

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
            <ReactWordcloud words={this.state.words} />
          </div>
        </section>
      </div>
    );
  }
}

export default App;
