import React, { Component } from 'react';
import './App.css';
import ReactWordcloud from 'react-wordcloud';
import axios from 'axios';
import { generateWordCloudData } from './utils/functions';

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
    redditData: '',
    redditSelect: 'subreddit',
    error: false,
    loading: false
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
    console.log(this.state.redditSelect);
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    if (this.state.redditSelect === 'subreddit') {
      try {
        //fetch posts
        const postData = await axios.get(
          `https://www.reddit.com/r/${this.state.redditData}.json`
        );
        const posts = postData.data.data.children;
        const combinedPosts = [];

        posts.forEach(function(post) {
          combinedPosts.push(post.data.title);
        });

        const subredditResults = generateWordCloudData(combinedPosts);

        this.setState({
          loading: false,
          error: false,
          words: subredditResults
        });
      } catch (err) {
        console.log(err);
        this.setState({ loading: false, error: true });
      }
    } else if (this.state.redditSelect === 'user') {
      try {
        //fetch user comments
        const commentsData = await axios.get(
          `https://www.reddit.com/user/${this.state.redditData}.json`
        );
        const comments = commentsData.data.data.children;

        const combinedComments = [];
        comments.forEach(function(comment) {
          combinedComments.push(comment.data.body);
        });

        const userCommentsResults = generateWordCloudData(combinedComments);

        this.setState({
          loading: false,
          error: false,
          words: userCommentsResults
        });
      } catch (err) {
        console.log(err);
        this.setState({ loading: false, error: true });
      }
    }
  };

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1>
            {this.state.redditSelect === 'subreddit'
              ? 'Subreddit Wordcloud Generator'
              : 'Reddit User Comment Wordcloud Generator'}
          </h1>
          <p className="subtitle">
            Upload your favourite subreddit and get a visual of the most
            commonly used words
          </p>
          <form onSubmit={this.onSubmit}>
            <select
              name="redditSelect"
              className="reddit-select"
              value={this.state.redditSelect}
              onChange={this.onChange}
            >
              <option value="subreddit">Subreddit</option>
              <option value="user">Reddit User</option>
            </select>
            <input
              type="text"
              name="redditData"
              value={this.state.redditData}
              onChange={this.onChange}
              placeholder="Example: webdev"
              className="reddit-input"
            />
            <button
              className="submit-button"
              type="submit"
              disabled={this.state.loading}
            >
              {this.state.loading ? `Fetching Posts` : `Generate Wordcloud`}
            </button>
          </form>
          <p className="error">
            {!this.state.error
              ? ''
              : `Darn! No data available for this request. Try submitting another request.`}
          </p>
        </header>
        <section className="app-section">
          <div className="container">
            {!this.state.words ? (
              <h2>
                Submit a {this.state.redditSelect} to generate a wordcloud
              </h2>
            ) : (
              <ReactWordcloud options={options} words={this.state.words} />
            )}
          </div>
        </section>
        <footer>
          Designed & developed by{' '}
          <a href="https://www.jon-funk.com/" target="_blank">
            Jonathan Funk
          </a>
        </footer>
      </div>
    );
  }
}

export default App;
