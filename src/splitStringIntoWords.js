function joinWords(words, minimumWordLength) {
  const result = words.reduce(
    ({ newWords, builtWord }, word) => (builtWord.length < minimumWordLength
      ? ({ builtWord: builtWord + word, newWords })
      : ({ builtWord: word, newWords: [...newWords, builtWord] })),
    { builtWord: '', newWords: [] },
  );

  return [
    ...result.newWords,
    ...(result.builtWord ? [result.builtWord] : []),
  ];
}

function splitRecursively(originalString, string, options) {
  const {
    delimiters = [' '],
    minimumWordLength,
    minimumNumberOfWords,
    shouldSplitCamelCase,
  } = options;
  if (!delimiters.length) {
    let words = string.split(' ');
    if (shouldSplitCamelCase) {
      words = words.map(word => word.split(/(?=[A-Z])/g)).flat();
    }
    if (minimumWordLength) {
      words = joinWords(words, minimumWordLength);
    }

    if (words.length < minimumNumberOfWords) {
      return [originalString];
    }

    return words;
  }

  return splitRecursively(
    originalString,
    string.split(delimiters[0]).join(' '),
    { ...options, delimiters: delimiters.slice(1) },
  );
}

function splitStringIntoWords(string, options = {}) {
  return splitRecursively(string, string, options);
}

export default splitStringIntoWords;
