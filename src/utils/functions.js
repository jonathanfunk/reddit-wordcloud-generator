import { stopwords } from './stopwords';

//Convert all text to lowercase & remove punctuation marks
function titleCleanUp(data) {
  const filteredData = data.filter(dataItem => dataItem !== undefined);
  const cleanData = filteredData.map(dataItem => {
    console.log(dataItem);
    return dataItem
      .toLowerCase()
      .replace(
        /(~|`|!|@|#|$|%|^|&|\*|\(|\)|{|}|\[|\]|;|:|\"|'|<|,|\.|>|\?|\/|\\|\||-|_|\+|=)/g,
        ''
      );
  });
  return cleanData;
}

//Remove stop words (Example: I, the, and, etc)
function removeStopWords(title) {
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
function createWordMap(wordsArray) {
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

function sortByCount(wordsMap) {
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

//Combine functions
export function generateWordCloudData(postData) {
  //Clean, combine & sort posts
  const cleanTitles = titleCleanUp(postData);
  const stopWordsRemoved = cleanTitles.map(title => {
    return removeStopWords(title);
  });
  const combinedTitles = stopWordsRemoved.join(' ').split(' ');
  const wordMap = createWordMap(combinedTitles);
  //Final step - sort by count
  return sortByCount(wordMap);
}
