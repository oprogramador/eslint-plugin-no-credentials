function findSubstrings(string) {
  const result = [];
  for (let i = 0; i < string.length; i++) {
    for (let j = 1; j <= string.length / 2 && i + j <= string.length; j++) {
      result.push(string.slice(i, i + j));
    }
  }

  return result;
}

export default findSubstrings;
