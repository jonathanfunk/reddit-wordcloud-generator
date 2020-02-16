import { stopwords } from './stopwords';

//Convert all text to lowercase & remove punctuation marks
export function titleCleanUp(titles) {
  const cleanTitles = titles.map(title => {
    return title
      .toLowerCase()
      .replace(
        /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,
        ''
      );
  });
  return cleanTitles;
}

//Remove stop words (Example: I, the, and, etc)
export function removeStopWords(title) {
  const res = [];
  const words = title.split(' ');
  for (let i = 0; i < words.length; i++) {
    if (!stopwords.includes(words[i])) {
      res.push(words[i]);
    }
  }
  return res.join(' ');
}

//Count words
export function createWordMap(wordsArray) {
  const wordsMap = {};
  wordsArray.forEach(function(key) {
    if (wordsMap.hasOwnProperty(key)) {
      wordsMap[key]++;
    } else {
      wordsMap[key] = 1;
    }
  });
  return wordsMap;
}

export function sortByCount(wordsMap) {
  // sort by count in descending order
  let sortedWordsMap = [];
  sortedWordsMap = Object.keys(wordsMap).map(function(key) {
    return {
      text: key,
      value: wordsMap[key]
    };
  });

  sortedWordsMap.sort(function(a, b) {
    return b.total - a.total;
  });
  return sortedWordsMap;
}
