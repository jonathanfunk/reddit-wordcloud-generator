# Reddit Wordcloud Generator

## Project

This is a wordcloud generator powered by React, Reddit API & [React Wordcloud](https://github.com/chrisrzhou/react-wordcloud/). Users can submit a subreddit or Reddit user and generate a wordcloud based on the words they use.

## Technology

- VS Code
- HTML5
- CSS3
- ES6 JavaScript
- React
- Git/Github

## Summary

What drove me to build this application was my curiosity on the general trend of a subreddit. What better way to display this information than using a wordcloud? There are many wordcloud generators out there but for the most part you have to manually add the text yourself, soo I've decided to make one specifically for Reddit.

[React Wordcloud](https://github.com/chrisrzhou/react-wordcloud/) by Chris Zhou is the right tool for the job. It was pretty simple to setup & style. Once I got it set up, it was time to bring in Reddit data. When I made a subreddit request through the Reddit API I had to go through several steps to upload the information to the generator (Combining posts into an array, clean up titles, removing punctuation & sorting). Once I got the generator up and running, I decided to take it a step further & create a generator for Reddit user comments.

I feel I've fulfilled my dream upon completing this application. I find that subreddits with a consistently sized wordcloud tend to be more original. And on top of commonly used words, you can get a sense of the subreddit's tone based on words used (fun, informative, depressing).
