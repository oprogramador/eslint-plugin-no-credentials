function splitRecursively(string, {
  delimiters = [' '],
}) {
  if (!delimiters.length) {
    return string.split(' ');
  }

  return splitRecursively(string.split(delimiters[0]).join(' '), { delimiters: delimiters.slice(1) });
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
