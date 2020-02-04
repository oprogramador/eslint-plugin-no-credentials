function joinWords(words, minimumWordLength) {
  const result = words.reduce(
    ({ newWords, builtWord }, word) => (
      builtWord.length < minimumWordLength
        ? ({ builtWord: builtWord + word, newWords })
        : ({ builtWord: word, newWords: [...newWords, builtWord] })
    ),
    { builtWord: '', newWords: [] },
  );

  return [
    ...result.newWords,
    ...(result.builtWord ? [result.builtWord] : []),
  ];
}

function splitRecursively(string, options) {
  const {
    delimiters = [' '],
    minimumWordLength,
  } = options;
  if (!delimiters.length) {
    const words = string.split(' ');
    if (minimumWordLength) {
      return joinWords(words, minimumWordLength);
    }

    return words;
  }

  return splitRecursively(string.split(delimiters[0]).join(' '), { ...options, delimiters: delimiters.slice(1) });
}

function splitStringIntoWords(string, options = {}) {
  const {
    delimiters = [' '],
    minimumNumberOfWords,
  } = options;

  if (string.split('').filter(character => delimiters.includes(character)).length < minimumNumberOfWords - 1) {
    return [string];
  }

  return splitRecursively(string, options);
}

export default splitStringIntoWords;
