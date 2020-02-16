import React, { Component } from 'react';
import './App.css';
import ReactWordcloud from 'react-wordcloud';
import axios from 'axios';
import {
  titleCleanUp,
  removeStopWords,
  createWordMap,
  sortByCount
} from './utils/functions';

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
    words: '',
    subreddit: '',
    loading: false
  };

  onChange = e => {
    e.preventDefault();
    this.setState({
      subreddit: e.target.value
    });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      //fetch posts
      const postData = await axios.get(
        `https://www.reddit.com/r/${this.state.subreddit}.json`
      );
      const posts = postData.data.data.children;

      //Combine posts by title
      const combinedPosts = [];
      posts.forEach(function(post) {
        combinedPosts.push(post.data.title);
      });

      const cleanTitles = titleCleanUp(combinedPosts);
      const stopWordsRemoved = cleanTitles.map(title => {
        return removeStopWords(title);
      });
      const combinedTitles = stopWordsRemoved.join(' ').split(' ');
      const wordMap = createWordMap(combinedTitles);
      const finalResults = sortByCount(wordMap);

      console.log('Final Results', finalResults);

      this.setState({ loading: false, words: finalResults });
    } catch (err) {
      console.log(err);
      this.setState({ loading: false });
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
            <button
              className="submit-button"
              type="submit"
              disabled={this.state.loading}
            >
              {this.state.loading ? `Fetching Posts` : `Generate Wordcloud`}
            </button>
          </form>
        </header>
        <section className="app-section">
          <div className="container">
            {!this.state.words ? (
              <h2>Submit a subreddit</h2>
            ) : (
              <ReactWordcloud options={options} words={this.state.words} />
            )}
          </div>
        </section>
      </div>
    );
  }
}

export default App;
