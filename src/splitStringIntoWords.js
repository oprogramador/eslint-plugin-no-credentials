function splitStringIntoWords(string, {
  delimiters = [' '],
} = {}) {
  if (!delimiters.length) {
    return string.split(' ');
  }

  return splitStringIntoWords(string.split(delimiters[0]).join(' '), { delimiters: delimiters.slice(1) });
}

export default splitStringIntoWords;
